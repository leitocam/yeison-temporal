"use client"

import React from 'react'
import styled from 'styled-components'
import { motion } from 'motion/react'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    rating?: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    quote,
    author,
    role,
    company,
    avatar,
    rating = 5
}) => {
    return (
        <StyledWrapper>
            <motion.div
                className="testimonial-card"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <div className="stars">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={i < rating ? 'star filled' : 'star'}
                        />
                    ))}
                </div>

                <p className="quote">&ldquo;{quote}&rdquo;</p>

                <div className="author-section">
                    <div className="avatar">
                        {avatar ? (
                            <img src={avatar} alt={author} />
                        ) : (
                            <span>{author.charAt(0)}</span>
                        )}
                    </div>
                    <div className="author-info">
                        <span className="name">{author}</span>
                        <span className="role">{role}, {company}</span>
                    </div>
                </div>
            </motion.div>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  .testimonial-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
    transition: all 0.3s ease;
  }

  .testimonial-card:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(3, 169, 244, 0.3);
    box-shadow: 0 20px 40px -15px rgba(3, 169, 244, 0.2);
  }

  .stars {
    display: flex;
    gap: 4px;
  }

  .star {
    color: #3a3a3a;
    fill: #3a3a3a;
  }

  .star.filled {
    color: #fbbf24;
    fill: #fbbf24;
  }

  .quote {
    color: #e9edef;
    font-size: 16px;
    line-height: 1.7;
    flex: 1;
    font-style: italic;
  }

  .author-section {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #03a9f4, #f441a5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
    font-size: 18px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .author-info {
    display: flex;
    flex-direction: column;
  }

  .name {
    color: white;
    font-weight: 600;
    font-size: 15px;
  }

  .role {
    color: #8696a0;
    font-size: 13px;
  }
`

export default TestimonialCard
