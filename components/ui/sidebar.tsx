"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Settings, Bell, Grid } from "lucide-react";

interface AnimatedMenuToggleProps {
    toggle: () => void;
    isOpen: boolean;
}

const AnimatedMenuToggle = ({
    toggle,
    isOpen,
}: AnimatedMenuToggleProps) => (
    <button
        onClick={toggle}
        aria-label="Toggle menu"
        className="focus:outline-none z-[999]"
    >
        <motion.div animate={{ y: isOpen ? 13 : 0 }} transition={{ duration: 0.3 }}>
            <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
                className="text-black"
            >
                <motion.path
                    fill="transparent"
                    strokeWidth="3"
                    stroke="currentColor"
                    strokeLinecap="round"
                    variants={{
                        closed: { d: "M 2 2.5 L 22 2.5" },
                        open: { d: "M 3 16.5 L 17 2.5" },
                    }}
                />
                <motion.path
                    fill="transparent"
                    strokeWidth="3"
                    stroke="currentColor"
                    strokeLinecap="round"
                    variants={{
                        closed: { d: "M 2 12 L 22 12", opacity: 1 },
                        open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                />
                <motion.path
                    fill="transparent"
                    strokeWidth="3"
                    stroke="currentColor"
                    strokeLinecap="round"
                    variants={{
                        closed: { d: "M 2 21.5 L 22 21.5" },
                        open: { d: "M 3 2.5 L 17 16.5" },
                    }}
                />
            </motion.svg>
        </motion.div>
    </button>
);

const MenuIcon = () => (
    <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <motion.line x1="3" y1="12" x2="21" y2="12" />
    </motion.svg>
);

const XIcon = () => (
    <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <motion.line x1="18" y1="6" x2="6" y2="18" />
        <motion.line x1="6" y1="6" x2="18" y2="18" />
    </motion.svg>
);

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
}

const CollapsibleSection = ({
    title,
    children,
}: CollapsibleSectionProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="mb-4">
            <button
                className="w-full flex items-center justify-between py-2 px-4 rounded-xl hover:bg-gray-100"
                onClick={() => setOpen(!open)}
            >
                <span className="font-semibold">{title}</span>
                {open ? <XIcon /> : <MenuIcon />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-2">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const mobileSidebarVariants = {
        hidden: { x: "-100%" },
        visible: { x: 0 },
    };

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                        className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={mobileSidebarVariants}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white text-black shadow-xl"
                    >
                        <div className="flex flex-col h-full">
                            {/* Profile Section */}
                            <div className="p-4 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                                        <User className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 leading-tight">HextaUI</p>
                                        <p className="text-xs text-gray-500 font-medium">hi@preetsuthar.me</p>
                                    </div>
                                </div>
                            </div>
                            {/* Navigation Section */}
                            <nav className="flex-1 p-4 overflow-y-auto">
                                <ul className="space-y-1">
                                    <li>
                                        <button className="flex gap-3 font-semibold text-sm items-center w-full py-2.5 px-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                                            <Home className="h-5 w-5" />
                                            Home
                                        </button>
                                    </li>
                                    <li>
                                        <button className="flex gap-3 font-semibold text-sm items-center w-full py-2.5 px-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                                            <Bell className="h-5 w-5" />
                                            Notifications
                                        </button>
                                    </li>
                                    <li>
                                        <button className="flex gap-3 font-semibold text-sm items-center w-full py-2.5 px-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                                            <Settings className="h-5 w-5" />
                                            Settings
                                        </button>
                                    </li>
                                </ul>
                                {/* Toggleable Sections */}
                                <div className="mt-6">
                                    <CollapsibleSection title="Extra Options">
                                        <ul className="space-y-1">
                                            <li>
                                                <button className="w-full font-semibold text-sm text-left px-4 py-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900">
                                                    Subscriptions
                                                </button>
                                            </li>
                                            <li>
                                                <button className="w-full font-semibold text-sm text-left px-4 py-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900">
                                                    Appearance
                                                </button>
                                            </li>
                                        </ul>
                                    </CollapsibleSection>
                                    <CollapsibleSection title="More Info">
                                        <p className="text-xs text-gray-500 px-4">
                                            Additional details and settings can be found here.
                                        </p>
                                    </CollapsibleSection>
                                </div>
                            </nav>
                            {/* Footer / Action Button */}
                            <div className="p-4 border-t border-gray-100">
                                <button className="w-full font-bold text-sm p-3 text-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                                    View profile
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64 bg-white text-black border-r border-gray-100 shadow-sm z-30">
                {/* Profile Section */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 shadow-sm">
                            <User className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 leading-tight">HextaUI</p>
                            <p className="text-xs text-gray-500 font-medium">hi@preetsuthar.me</p>
                        </div>
                    </div>
                </div>
                {/* Navigation Section */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-1">
                        <li>
                            <button className="flex gap-3 font-semibold text-sm items-center w-full py-2.5 px-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                                <Home className="h-5 w-5" />
                                Home
                            </button>
                        </li>
                        <li>
                            <button className="flex gap-3 font-semibold text-sm items-center w-full py-2.5 px-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                                <Bell className="h-5 w-5" />
                                Notifications
                            </button>
                        </li>
                        <li>
                            <button className="flex gap-3 font-semibold text-sm items-center w-full py-2.5 px-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                                <Settings className="h-5 w-5" />
                                Settings
                            </button>
                        </li>
                        <li>
                            <button className="flex gap-3 font-semibold text-sm items-center w-full py-2.5 px-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                                <Grid className="h-5 w-5" />
                                Categories
                            </button>
                        </li>
                    </ul>
                    {/* Toggleable Sections */}
                    <div className="mt-8">
                        <CollapsibleSection title="Extra Options">
                            <ul className="space-y-1">
                                <li>
                                    <button className="w-full font-semibold text-sm text-left px-4 py-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900">
                                        Subscriptions
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full font-semibold text-sm text-left px-4 py-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900">
                                        Appearance
                                    </button>
                                </li>
                            </ul>
                        </CollapsibleSection>
                        <CollapsibleSection title="More Info">
                            <p className="text-xs text-gray-500 px-4">
                                Additional details and settings can be found here.
                            </p>
                        </CollapsibleSection>
                    </div>
                </nav>
                {/* Footer / Action Button */}
                <div className="p-6 border-t border-gray-100">
                    <button className="w-full font-bold text-sm p-3 text-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                        View profile
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-0 md:ml-64 transition-all duration-300 bg-gray-50 min-h-screen">
                {/* Top bar for mobile toggle */}
                <div className="p-4 bg-white border-b border-gray-100 md:hidden flex justify-between items-center sticky top-0 z-20">
                    <h1 className="text-lg font-bold text-gray-900">Main Content</h1>
                    <AnimatedMenuToggle toggle={toggleSidebar} isOpen={isOpen} />
                </div>
                <div className="p-8">
                    <div className="max-w-4xl">
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Main Content</h1>
                        <p className="text-gray-500 font-medium">
                            Additional details and settings can be found here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Sidebar };
