import { NextRequest, NextResponse } from 'next/server'
import { createSessionClient } from '@/lib/supabase-server'
import ExcelJS from 'exceljs'
import { PassThrough } from 'stream'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
    try {
        const supabase = await createSessionClient()
        if (!supabase) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
        }

        // Create a passthrough stream to write the excel data to
        const stream = new PassThrough()

        // 1. Fetch data with explicit JOIN to resolve column issues
        const { data: responses, error } = await supabase
            .from('responses')
            .select(`
                created_at,
                status,
                uid,
                supplier_token,
                ip,
                projects (
                    project_code,
                    country,
                    clients (
                        name
                    )
                )
            `)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Export fetch error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // 2. Setup Excel Workbook Writer (Streaming)
        const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
            stream: stream,
            useStyles: true,
            useSharedStrings: true
        })

        const worksheet = workbook.addWorksheet('Responses')

        // 3. Define Columns
        worksheet.columns = [
            { header: 'Client', key: 'client', width: 22 },
            { header: 'Project', key: 'project', width: 22 },
            { header: 'Country', key: 'country', width: 14 },
            { header: 'Original UID', key: 'uid', width: 30 },
            { header: 'Supplier Token', key: 'token', width: 30 },
            { header: 'Status', key: 'status', width: 18 },
            { header: 'IP Address', key: 'ip', width: 20 },
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Time', key: 'time', width: 15 },
        ]

        // 4. Style headers (Commit first row)
        const headerRow = worksheet.getRow(1)
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11, name: 'Calibri' }
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF4F46E5' } // Indigo-600
        }
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' }
        headerRow.commit()

        // 5. Add Data Rows
        type ResponseRow = { created_at: string; status: string; uid?: string; supplier_token?: string; ip?: string; projects?: { project_code?: string; country?: string; clients?: { name?: string } } }
        responses?.forEach((r: ResponseRow) => {
            const dateObj = new Date(r.created_at)

            // Safely extract joined data
            const projData = r.projects as any
            const clientData = projData?.clients as any

            const rowData = {
                client: clientData?.name || 'N/A',
                project: projData?.project_code || 'N/A',
                country: projData?.country || 'N/A',
                uid: r.uid || 'N/A',
                token: r.supplier_token || r.uid || 'N/A',
                status: r.status.toUpperCase(),
                ip: r.ip || 'N/A',
                date: dateObj.toLocaleDateString('en-GB').replace(/\//g, '-'), // DD-MM-YYYY
                time: dateObj.toLocaleTimeString('en-GB') // HH:mm:ss
            }

            const row = worksheet.addRow(rowData)

            // 6. Professional Color Coding for Status
            const statusCell = row.getCell('status')
            const statusValue = r.status.toLowerCase()

            statusCell.alignment = { horizontal: 'center' }

            if (statusValue === 'complete') {
                statusCell.font = { color: { argb: 'FF059669' }, bold: true } // Emerald-600
            } else if (statusValue === 'terminate' || statusValue === 'abuse') {
                statusCell.font = { color: { argb: 'FFDC2626' }, bold: true } // Red-600
            } else if (statusValue === 'quota') {
                statusCell.font = { color: { argb: 'FFD97706' }, bold: true } // Amber-600
            } else if (statusValue === 'started') {
                statusCell.font = { color: { argb: 'FF2563EB' }, bold: true } // Blue-600
            }

            row.commit()
        })

        // 7. Finalize and Export
        workbook.commit()

        // Convert PassThrough to ReadableStream for Next.js Response Compatibility
        const responseStream = new ReadableStream({
            start(controller) {
                stream.on('data', (chunk) => controller.enqueue(chunk))
                stream.on('end', () => controller.close())
                stream.on('error', (err) => controller.error(err))
            }
        })

        return new Response(responseStream, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="responses-export-${new Date().toISOString().split('T')[0]}.xlsx"`,
            }
        })

    } catch (err: any) {
        console.error('Export route error:', err)
        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
    }
}
