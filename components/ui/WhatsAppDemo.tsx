"use client"

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCheck, Phone, Video, MoreVertical, Smile, Paperclip, Mic, ArrowLeft, Wifi, Signal, Battery } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  time: string
}

const WhatsAppDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTime, setCurrentTime] = useState('10:30')

  const conversation: Message[] = [
    { id: 1, text: "Hola, me interesa el producto X que vi en su página 👋", sender: 'user', time: '10:30' },
    { id: 2, text: "¡Hola! 👋 Soy el asistente virtual de Ventas. Me encanta que te interese nuestro producto X.\n\nTiene estas características:\n✅ Alta durabilidad\n✅ Garantía de 2 años\n✅ Envío gratis en Santa Cruz", sender: 'bot', time: '10:30' },
    { id: 3, text: "¿Cuál es el precio? 💰", sender: 'user', time: '10:31' },
    { id: 4, text: "El precio es Bs. 350 💵\n\n🚚 Tenemos stock disponible y podemos enviártelo hoy mismo.\n\n¿Te preparo la cotización formal? 📋", sender: 'bot', time: '10:31' },
    { id: 5, text: "Sí, por favor! 🙌", sender: 'user', time: '10:32' },
    { id: 6, text: "¡Perfecto! 🎉\n\nTe envío la cotización al instante.\n\n¿Prefieres pagar con:\n💳 QR\n🏦 Transferencia\n💵 Efectivo contra entrega?", sender: 'bot', time: '10:32' },
  ]

  useEffect(() => {
    if (currentIndex >= conversation.length) {
      const resetTimeout = setTimeout(() => {
        setMessages([])
        setCurrentIndex(0)
      }, 5000)
      return () => clearTimeout(resetTimeout)
    }

    const nextMessage = conversation[currentIndex]

    if (nextMessage.sender === 'bot') {
      setIsTyping(true)
      const typingTimeout = setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, nextMessage])
        setCurrentIndex(prev => prev + 1)
        setCurrentTime(nextMessage.time)
      }, 2000 + Math.random() * 1000)
      return () => clearTimeout(typingTimeout)
    } else {
      const messageTimeout = setTimeout(() => {
        setMessages(prev => [...prev, nextMessage])
        setCurrentIndex(prev => prev + 1)
        setCurrentTime(nextMessage.time)
      }, 1200)
      return () => clearTimeout(messageTimeout)
    }
  }, [currentIndex, conversation.length])

  return (
    <StyledWrapper>
      {/* Glow Effect Behind Phone */}
      <div className="phone-glow" />
      <div className="phone-glow secondary" />

      <div className="iphone-frame">
        {/* Titanium Frame Texture */}
        <div className="titanium-texture" />

        {/* Frame Highlights */}
        <div className="frame-highlight top" />
        <div className="frame-highlight right" />
        <div className="frame-highlight bottom" />
        <div className="frame-highlight left" />

        {/* Dynamic Island */}
        <div className="dynamic-island">
          <div className="island-content">
            <div className="face-id-dot" />
            <div className="camera-lens">
              <div className="lens-inner" />
              <div className="lens-reflection" />
            </div>
          </div>
        </div>

        {/* Side Buttons with Texture */}
        <div className="side-button power">
          <div className="button-texture" />
        </div>
        <div className="side-button volume-up">
          <div className="button-texture" />
        </div>
        <div className="side-button volume-down">
          <div className="button-texture" />
        </div>
        <div className="side-button silent">
          <div className="button-texture" />
        </div>

        {/* Screen Content */}
        <div className="screen-content">
          {/* Realistic Screen Edge */}
          <div className="screen-edge" />

          {/* Status Bar */}
          <div className="status-bar">
            <span className="time">{currentTime}</span>
            <div className="status-icons">
              <div className="signal-bars">
                <div className="bar" style={{ height: '4px' }} />
                <div className="bar" style={{ height: '6px' }} />
                <div className="bar" style={{ height: '8px' }} />
                <div className="bar" style={{ height: '10px' }} />
              </div>
              <div className="wifi-icon">
                <div className="wifi-arc" style={{ width: '6px', height: '3px' }} />
                <div className="wifi-arc" style={{ width: '10px', height: '5px' }} />
                <div className="wifi-arc" style={{ width: '14px', height: '7px' }} />
              </div>
              <div className="battery">
                <div className="battery-body">
                  <div className="battery-level" />
                </div>
                <div className="battery-cap" />
              </div>
            </div>
          </div>

          {/* WhatsApp Header */}
          <div className="whatsapp-header">
            <div className="header-left">
              <ArrowLeft className="back-icon" size={22} />
              <div className="avatar-container">
                <div className="avatar">
                  <span>Y</span>
                  <div className="avatar-ring" />
                </div>
                <div className="online-dot">
                  <div className="online-pulse" />
                </div>
              </div>
              <div className="header-info">
                <span className="name">Yeison AI</span>
                <span className="status">en línea</span>
              </div>
            </div>
            <div className="header-actions">
              <div className="action-btn"><Video size={20} /></div>
              <div className="action-btn"><Phone size={18} /></div>
              <div className="action-btn"><MoreVertical size={20} /></div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="messages-area">
            {/* Decorative Pattern Overlay */}
            <div className="pattern-overlay" />

            {/* Date Chip */}
            <div className="date-chip">
              <span>Hoy</span>
            </div>

            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className={`message ${msg.sender}`}
                >
                  <div className="message-bubble">
                    <span className="message-text">{msg.text}</span>
                    <span className="message-meta">
                      <span className="message-time">{msg.time}</span>
                      {msg.sender === 'user' && <CheckCheck className="read-icon" size={16} />}
                    </span>
                  </div>
                  <div className={`bubble-tail ${msg.sender}`} />
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="message bot"
                >
                  <div className="message-bubble typing-bubble">
                    <div className="typing-indicator">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="input-area">
            <div className="input-container">
              <Smile className="input-icon emoji" size={24} />
              <input
                type="text"
                placeholder="Mensaje"
                className="message-input"
                readOnly
              />
              <Paperclip className="input-icon attach" size={22} />
            </div>
            <div className="mic-button">
              <Mic size={20} />
            </div>
          </div>

          {/* Home Indicator */}
          <div className="home-indicator" />
        </div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  position: relative;
  
  /* Glow effects behind phone */
  .phone-glow {
    position: absolute;
    width: 200px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(3, 169, 244, 0.3) 0%, transparent 70%);
    filter: blur(40px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: -1;
  }
  
  .phone-glow.secondary {
    background: radial-gradient(ellipse, rgba(244, 65, 165, 0.2) 0%, transparent 70%);
    width: 300px;
    height: 300px;
    animation: pulse-glow 4s ease-in-out infinite;
  }
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
  }
  
  .iphone-frame {
    position: relative;
    width: 290px;
    height: 590px;
    background: linear-gradient(
      165deg,
      #3d3d3f 0%,
      #2a2a2c 15%,
      #1c1c1e 30%,
      #2d2d2f 50%,
      #1c1c1e 70%,
      #2a2a2c 85%,
      #3d3d3f 100%
    );
    border-radius: 52px;
    padding: 12px;
    box-shadow: 
      /* Outer shadow */
      0 50px 100px -20px rgba(0, 0, 0, 0.8),
      0 30px 60px -10px rgba(0, 0, 0, 0.6),
      /* Inner highlights for depth */
      inset 0 2px 4px rgba(255, 255, 255, 0.1),
      inset 0 -2px 4px rgba(0, 0, 0, 0.3),
      /* Frame edge definition */
      0 0 0 1px rgba(80, 80, 80, 0.5),
      0 0 0 2px rgba(0, 0, 0, 0.3);
    transform: rotateY(-3deg) rotateX(2deg);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }

  .iphone-frame:hover {
    transform: rotateY(0deg) rotateX(0deg) scale(1.02);
    box-shadow: 
      0 60px 120px -20px rgba(3, 169, 244, 0.3),
      0 40px 80px -10px rgba(0, 0, 0, 0.5),
      inset 0 2px 4px rgba(255, 255, 255, 0.15),
      inset 0 -2px 4px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(100, 100, 100, 0.6),
      0 0 0 2px rgba(0, 0, 0, 0.3);
  }

  /* Titanium texture overlay */
  .titanium-texture {
    position: absolute;
    inset: 0;
    border-radius: 52px;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent 0px,
        rgba(255, 255, 255, 0.02) 1px,
        transparent 2px
      );
    pointer-events: none;
    z-index: 1;
  }

  /* Frame highlights for 3D effect */
  .frame-highlight {
    position: absolute;
    pointer-events: none;
    z-index: 2;
  }
  
  .frame-highlight.top {
    top: 0;
    left: 15%;
    right: 15%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 52px 52px 0 0;
  }
  
  .frame-highlight.right {
    top: 15%;
    bottom: 15%;
    right: 0;
    width: 1px;
    background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.08), transparent);
  }
  
  .frame-highlight.bottom {
    bottom: 0;
    left: 20%;
    right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.3), transparent);
  }
  
  .frame-highlight.left {
    top: 20%;
    bottom: 20%;
    left: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }

  /* Dynamic Island with camera details */
  .dynamic-island {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 32px;
    background: #000;
    border-radius: 18px;
    z-index: 20;
    box-shadow: 
      inset 0 0 4px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(30, 30, 30, 0.5);
    overflow: hidden;
  }

  .island-content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding: 0 12px;
    gap: 8px;
  }
  
  .face-id-dot {
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #1a1a2e 0%, #0a0a15 100%);
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(80, 80, 120, 0.3);
  }

  .camera-lens {
    width: 12px;
    height: 12px;
    background: radial-gradient(circle at 40% 40%, #2a2a4a, #0a0a15);
    border-radius: 50%;
    position: relative;
    box-shadow: 0 0 0 2px rgba(40, 40, 60, 0.5);
  }
  
  .lens-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #1a237e, #000);
    border-radius: 50%;
  }
  
  .lens-reflection {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 3px;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
  }

  /* Side Buttons with texture */
  .side-button {
    position: absolute;
    background: linear-gradient(
      180deg,
      #3a3a3c 0%,
      #2c2c2e 30%,
      #1a1a1c 70%,
      #2c2c2e 100%
    );
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 2px rgba(0, 0, 0, 0.5);
  }
  
  .button-texture {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 2px
    );
  }

  .side-button.power {
    right: -4px;
    top: 160px;
    width: 4px;
    height: 85px;
  }

  .side-button.volume-up {
    left: -4px;
    top: 130px;
    width: 4px;
    height: 55px;
  }

  .side-button.volume-down {
    left: -4px;
    top: 200px;
    width: 4px;
    height: 55px;
  }

  .side-button.silent {
    left: -4px;
    top: 90px;
    width: 4px;
    height: 28px;
  }

  /* Screen Content */
  .screen-content {
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 42px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  .screen-edge {
    position: absolute;
    inset: 0;
    border-radius: 42px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.8);
    pointer-events: none;
    z-index: 10;
  }

  /* Status Bar */
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 28px 8px;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
  }

  .time {
    font-feature-settings: "tnum";
    letter-spacing: 0.5px;
  }

  .status-icons {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .signal-bars {
    display: flex;
    align-items: flex-end;
    gap: 1px;
    height: 12px;
  }
  
  .signal-bars .bar {
    width: 3px;
    background: #fff;
    border-radius: 1px;
  }
  
  .wifi-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 12px;
    gap: 1px;
  }
  
  .wifi-arc {
    border: 2px solid #fff;
    border-bottom: none;
    border-radius: 100% 100% 0 0;
  }

  .battery {
    display: flex;
    align-items: center;
    gap: 1px;
  }

  .battery-body {
    width: 24px;
    height: 11px;
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    border-radius: 3px;
    padding: 1px;
    position: relative;
  }
  
  .battery-level {
    height: 100%;
    width: 100%;
    background: #30d158;
    border-radius: 1.5px;
  }

  .battery-cap {
    width: 2px;
    height: 5px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 0 2px 2px 0;
  }

  /* WhatsApp Header */
  .whatsapp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    background: linear-gradient(180deg, #1f2c34 0%, #1a262d 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .back-icon {
    color: #00a884;
  }

  .avatar-container {
    position: relative;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #03a9f4 0%, #f441a5 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
    font-size: 17px;
    position: relative;
    box-shadow: 0 2px 8px rgba(3, 169, 244, 0.3);
  }
  
  .avatar-ring {
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    border: 2px solid transparent;
    background: linear-gradient(135deg, #03a9f4, #f441a5) border-box;
    mask: 
      linear-gradient(#fff 0 0) padding-box, 
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0.5;
  }

  .online-dot {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 13px;
    height: 13px;
    background: #00a884;
    border: 2px solid #1a262d;
    border-radius: 50%;
  }
  
  .online-pulse {
    position: absolute;
    inset: 0;
    background: #00a884;
    border-radius: 50%;
    animation: online-ping 2s infinite;
  }
  
  @keyframes online-ping {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }

  .header-info {
    display: flex;
    flex-direction: column;
    margin-left: 2px;
  }

  .name {
    color: #e9edef;
    font-weight: 500;
    font-size: 16px;
  }

  .status {
    color: #8696a0;
    font-size: 12px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .action-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #8696a0;
    transition: all 0.2s ease;
  }
  
  .action-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #e9edef;
  }

  /* Messages Area */
  .messages-area {
    flex: 1;
    padding: 8px 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 3px;
    background: 
      linear-gradient(180deg, #0a1014 0%, #0d1418 50%, #0a1014 100%);
    position: relative;
  }
  
  /* Decorative pattern overlay */
  .pattern-overlay {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(3, 169, 244, 0.03) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(244, 65, 165, 0.03) 0%, transparent 40%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 5L35 15L45 15L37 23L40 33L30 27L20 33L23 23L15 15L25 15Z' fill='%23ffffff' opacity='0.01'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .date-chip {
    align-self: center;
    background: rgba(30, 45, 54, 0.95);
    padding: 5px 14px;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .date-chip span {
    color: #8696a0;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
  }

  /* Message Bubbles */
  .message {
    display: flex;
    flex-direction: column;
    max-width: 85%;
    margin-bottom: 2px;
    position: relative;
    z-index: 1;
  }

  .message.user {
    align-self: flex-end;
  }

  .message.bot {
    align-self: flex-start;
  }

  .message-bubble {
    padding: 7px 11px 7px 11px;
    border-radius: 12px;
    position: relative;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }

  .message.user .message-bubble {
    background: linear-gradient(135deg, #005c4b 0%, #004d40 100%);
    border-top-right-radius: 4px;
  }

  .message.bot .message-bubble {
    background: linear-gradient(135deg, #1f2c34 0%, #1a262d 100%);
    border-top-left-radius: 4px;
  }

  .message-text {
    color: #e9edef;
    font-size: 13.5px;
    line-height: 1.4;
    white-space: pre-line;
    word-break: break-word;
  }

  .message-meta {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    margin-top: 3px;
  }

  .message-time {
    color: rgba(255, 255, 255, 0.55);
    font-size: 11px;
  }

  .read-icon {
    color: #53bdeb;
  }

  /* Bubble Tail */
  .bubble-tail {
    position: absolute;
    top: 0;
    width: 10px;
    height: 15px;
  }

  .bubble-tail.user {
    right: -8px;
    clip-path: polygon(0 0, 100% 0, 0 100%);
    background: linear-gradient(135deg, #005c4b 0%, #004d40 100%);
  }

  .bubble-tail.bot {
    left: -8px;
    clip-path: polygon(100% 0, 100% 100%, 0 0);
    background: linear-gradient(135deg, #1f2c34 0%, #1a262d 100%);
  }

  /* Typing Indicator */
  .typing-bubble {
    padding: 14px 18px;
  }

  .typing-indicator {
    display: flex;
    gap: 5px;
  }

  .typing-dot {
    width: 9px;
    height: 9px;
    background: #8696a0;
    border-radius: 50%;
    animation: typing-bounce 1.4s infinite ease-in-out both;
  }

  .typing-dot:nth-child(1) { animation-delay: -0.32s; }
  .typing-dot:nth-child(2) { animation-delay: -0.16s; }
  .typing-dot:nth-child(3) { animation-delay: 0s; }

  @keyframes typing-bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }

  /* Input Area */
  .input-area {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px 12px;
    background: linear-gradient(180deg, #0b141a 0%, #0f1a21 100%);
  }

  .input-container {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(180deg, #1f2c34 0%, #1a262d 100%);
    border-radius: 24px;
    padding: 9px 14px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .input-icon {
    color: #8696a0;
    flex-shrink: 0;
    transition: color 0.2s ease;
  }
  
  .input-icon:hover {
    color: #a0b0b8;
  }

  .message-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #e9edef;
    font-size: 15px;
    min-width: 0;
  }

  .message-input::placeholder {
    color: #8696a0;
  }

  .mic-button {
    width: 46px;
    height: 46px;
    background: linear-gradient(135deg, #00a884 0%, #008f70 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(0, 168, 132, 0.4);
    transition: all 0.2s ease;
  }
  
  .mic-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 168, 132, 0.5);
  }

  /* Home Indicator */
  .home-indicator {
    width: 130px;
    height: 5px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 3px;
    margin: 8px auto 6px;
  }
`

export default WhatsAppDemo
