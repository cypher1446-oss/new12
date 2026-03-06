"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Toggle } from "@/components/ui/toggle";
import { AuthComponent } from "@/components/ui/sign-up";
import {
    Gem, Layout, MousePointer2, ToggleLeft, UserPlus,
    Sparkles, ArrowRight, Zap, Shield, Layers, ChevronRight
} from "lucide-react";

/* ─── Animation helpers ─────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function StaggerGrid({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            variants={scaleIn}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(91,92,246,0.10)" }}
            className={`bg-white border border-border-base rounded-[28px] overflow-hidden ${className}`}
        >
            {children}
        </motion.div>
    );
}

/* ─── Tabs ─────────────────────────────────────────── */
const TABS = [
    { id: "all", label: "All", icon: Layers },
    { id: "button", label: "Button", icon: MousePointer2 },
    { id: "toggle", label: "Toggle", icon: ToggleLeft },
    { id: "auth", label: "Auth", icon: UserPlus },
] as const;

type Tab = (typeof TABS)[number]["id"];

/* ─── Feature mini-cards ────────────────────────────── */
const FEATURES = [
    { icon: Zap, label: "Framer Motion", desc: "Spring-based animations" },
    { icon: Shield, label: "Accessible", desc: "ARIA-compliant components" },
    { icon: Layers, label: "Composable", desc: "Slot-based customisation" },
    { icon: Sparkles, label: "Premium feel", desc: "Micro-interactions built in" },
];

export default function DemoPage() {
    const [activeTab, setActiveTab] = useState<Tab>("all");
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(true);
    const [showAuth, setShowAuth] = useState(false);

    const show = (tab: Tab) => activeTab === "all" || activeTab === tab;

    return (
        <div className="min-h-screen bg-bg-alt text-text-dark font-sans">

            {/* ── Hero / Header ───────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border-base px-6 py-3 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <div className="bg-primary p-2 rounded-xl text-white shadow-primary-soft">
                        <Gem className="w-4 h-4" />
                    </div>
                    <span className="font-black text-xl tracking-tight">Component Lab</span>
                </motion.div>

                {/* Pill nav */}
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-2xl"
                >
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-colors duration-200 ${activeTab === t.id ? "text-primary" : "text-text-muted hover:text-text-dark"
                                }`}
                        >
                            {activeTab === t.id && (
                                <motion.span
                                    layoutId="pill"
                                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
                                    transition={{ type: "spring", damping: 22, stiffness: 300 }}
                                />
                            )}
                            <span className="relative">{t.label}</span>
                        </button>
                    ))}
                </motion.nav>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <InteractiveHoverButton text="Get Started" className="w-40 h-11 text-sm" />
                </motion.div>
            </header>

            {/* ── Hero section ─────────────────────────────────── */}
            <section className="pt-20 pb-16 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl mx-auto space-y-5"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
                    >
                        Premium Components
                    </motion.span>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
                        Beautiful. <span className="text-primary">Animated.</span> Ready.
                    </h1>
                    <p className="text-text-muted font-medium text-lg max-w-lg mx-auto">
                        A set of premium React components with butter-smooth Framer Motion animations, built for modern SaaS products.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <InteractiveHoverButton text="Explore" className="w-40 h-12" />
                        <button className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-text-dark transition-colors group">
                            View source
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* ── Feature chips ─────────────────────────────────── */}
            <StaggerGrid className="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                {FEATURES.map(({ icon: Icon, label, desc }) => (
                    <motion.div
                        key={label}
                        variants={scaleIn}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.03 }}
                        className="bg-white border border-border-base rounded-2xl p-4 shadow-bento cursor-default"
                    >
                        <div className="bg-primary/10 w-9 h-9 rounded-xl flex items-center justify-center mb-3">
                            <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="font-black text-sm text-text-dark">{label}</p>
                        <p className="text-xs text-text-muted font-medium mt-0.5">{desc}</p>
                    </motion.div>
                ))}
            </StaggerGrid>

            <main className="pb-16 px-6 max-w-5xl mx-auto space-y-20">

                {/* ── Interactive Hover Button ───────────────────── */}
                <AnimatePresence>
                    {show("button") && (
                        <Section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
                                    <MousePointer2 className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-black">Interactive Hover Button</h2>
                            </div>
                            <Card className="p-12 flex flex-col items-center gap-8 min-h-[260px]">
                                <p className="text-text-muted font-medium text-center max-w-md">
                                    Liquid displacement effect with a smooth scale transform. Hover over any button below.
                                </p>
                                <StaggerGrid className="flex flex-wrap items-center justify-center gap-10">
                                    {[
                                        ["Purchase", ""],
                                        ["Learn More", "w-40 h-12"],
                                        ["Contact Us", "bg-gray-900 text-white border-none w-36"],
                                    ].map(([text, cls]) => (
                                        <motion.div key={text} variants={fadeUp}>
                                            <InteractiveHoverButton text={text} className={cls} />
                                        </motion.div>
                                    ))}
                                </StaggerGrid>
                            </Card>
                        </Section>
                    )}
                </AnimatePresence>

                {/* ── Toggle ────────────────────────────────────── */}
                <AnimatePresence>
                    {show("toggle") && (
                        <Section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                                    <ToggleLeft className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-black">Custom Toggles</h2>
                            </div>
                            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="p-8">
                                    <h3 className="font-black text-base mb-6">Sizes</h3>
                                    <div className="flex flex-col gap-5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-text-muted">Large</span>
                                            <Toggle checked={toggle1} onChange={() => setToggle1(!toggle1)} size="large" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-text-muted">Small</span>
                                            <Toggle checked={toggle2} onChange={() => setToggle2(!toggle2)} size="small" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-text-muted">Disabled</span>
                                            <Toggle checked={false} onChange={() => { }} disabled size="large" />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-8">
                                    <h3 className="font-black text-base mb-6">Colour variants</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {(["blue", "purple", "pink", "amber", "teal", "red"] as const).map((c) => (
                                            <motion.div
                                                key={c}
                                                whileHover={{ scale: 1.05 }}
                                                className="flex flex-col items-center gap-2"
                                            >
                                                <Toggle checked={true} color={c} size="large" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted capitalize">{c}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </Card>
                            </StaggerGrid>
                        </Section>
                    )}
                </AnimatePresence>

                {/* ── Auth Component ────────────────────────────── */}
                <AnimatePresence>
                    {show("auth") && (
                        <Section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
                                    <UserPlus className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-black">Auth Component (Sign-Up)</h2>
                            </div>

                            {!showAuth ? (
                                <Card className="p-12 flex flex-col items-center justify-center gap-6 min-h-[300px]">
                                    <Sparkles className="w-10 h-10 text-primary opacity-60" />
                                    <div className="text-center">
                                        <p className="font-black text-xl mb-2">3-Step Sign-Up Flow</p>
                                        <p className="text-text-muted font-medium text-sm max-w-sm">
                                            Email → Password → Confirm — with animated transitions, inline validation, and a confetti success burst.
                                        </p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setShowAuth(true)}
                                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-primary-soft hover:bg-primary-hover transition-colors"
                                    >
                                        Launch Demo <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </Card>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="rounded-[28px] overflow-hidden border border-border-base min-h-[740px] relative"
                                >
                                    <button
                                        onClick={() => setShowAuth(false)}
                                        className="absolute top-4 right-4 z-50 bg-white/80 backdrop-blur text-text-muted hover:text-text-dark border border-border-base rounded-full px-3 py-1 text-xs font-bold transition-colors"
                                    >
                                        Close ✕
                                    </button>
                                    <AuthComponent />
                                </motion.div>
                            )}
                        </Section>
                    )}
                </AnimatePresence>

            </main>

            {/* ── Footer ────────────────────────────────────────── */}
            <footer className="border-t border-border-base py-8 px-6 text-center">
                <p className="text-xs text-text-muted font-medium">
                    Built with <span className="text-primary font-bold">Framer Motion</span> · TypeScript · Next.js
                </p>
            </footer>
        </div>
    );
}
