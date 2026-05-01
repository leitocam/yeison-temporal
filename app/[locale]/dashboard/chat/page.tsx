"use client"

import { ChatTab } from "@/components/dashboard"
import { useState } from "react"

export default function ChatPage() {
    // In a fully routed architecture, ChatTab probably doesn't need onTabChange,
    // but we provide a dummy one to satisfy props for now.
    const [activeTab, setActiveTab] = useState<any>("chat")
    
    return <ChatTab onTabChange={setActiveTab} />
}
