'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export type TeamMember = {
  name: string
  role?: string
  githubUsername: string
  linkedinSlug: string
}

export type GithubUser = {
  login: string
  avatar_url: string
  html_url: string
  name?: string
  bio?: string
} | null

export default function TeamGrid({
  profiles,
}: {
  profiles: { member: TeamMember; gh: GithubUser }[]
}) {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 220, damping: 22 },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {profiles.map(({ member, gh }) => {
        const avatar = gh?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`
        const githubUrl = gh?.html_url || `https://github.com/${member.githubUsername}`
        const linkedinUrl = `https://www.linkedin.com/in/${member.linkedinSlug}`
        return (
          <motion.div
            key={member.githubUsername}
            variants={item}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-shadow"
          >
            <div className="flex items-center gap-5">
              <motion.div
                className="relative shrink-0 h-24 w-24 overflow-hidden rounded-full border border-white/10 bg-white/5"
                whileHover={{ rotate: 2 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <Image src={avatar} alt={`${member.name} avatar`} fill sizes="96px" className="object-cover object-center" />
              </motion.div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold truncate">{member.name}</div>
                  {member.role ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/20">
                      {member.role}
                    </span>
                  ) : null}
                </div>
                <div className="mt-1 text-xs text-muted truncate">@{member.githubUsername}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Link
                href={githubUrl}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="opacity-80">
                  <path
                    fill="currentColor"
                    d="M12 2C6.475 2 2 6.588 2 12.253c0 4.52 2.865 8.35 6.839 9.703c.5.096.683-.22.683-.49c0-.242-.01-1.048-.015-1.901c-2.782.616-3.37-1.215-3.37-1.215c-.455-1.177-1.11-1.49-1.11-1.49c-.908-.64.069-.627.069-.627c1.003.072 1.53 1.05 1.53 1.05c.892 1.57 2.341 1.116 2.91.853c.091-.665.35-1.116.636-1.373c-2.222-.258-4.555-1.144-4.555-5.09c0-1.124.387-2.043 1.021-2.763c-.103-.258-.443-1.3.097-2.71c0 0 .836-.275 2.74 1.055A9.29 9.29 0 0 1 12 6.844c.847.004 1.7.117 2.497.343c1.902-1.33 2.737-1.055 2.737-1.055c.542 1.41.202 2.452.1 2.71c.636.72 1.02 1.639 1.02 2.763c0 3.957-2.337 4.828-4.565 5.082c.36.32.682.948.682 1.912c0 1.38-.013 2.493-.013 2.832c0 .272.18.592.688.49C19.138 20.6 22 16.77 22 12.252C22 6.588 17.523 2 12 2Z"
                  />
                </svg>
                <span>GitHub</span>
              </Link>
              <Link
                href={`https://www.linkedin.com/in/${member.linkedinSlug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="opacity-80">
                  <path fill="currentColor" d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5S1.12 1 2.5 1s2.483 1.12 2.483 2.5M.24 8.339h4.522v14.58H.24zM8.713 8.339h4.335v1.99h.062c.604-1.145 2.08-2.353 4.28-2.353c4.581 0 5.427 3.017 5.427 6.944v8H18.29v-7.094c0-1.692-.03-3.868-2.356-3.868c-2.361 0-2.721 1.845-2.721 3.75v7.212H8.713z"/>
                </svg>
                <span>LinkedIn</span>
              </Link>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}


