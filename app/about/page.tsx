import Link from 'next/link'
import TeamGrid from '@/components/about/TeamGrid'

type TeamMember = {
  name: string
  role?: string
  githubUsername: string
  linkedinSlug: string
}

const TEAM: TeamMember[] = [
  { name: 'Purav Bhatt', role: 'Project Coordinator', githubUsername: 'puravbhatt0504', linkedinSlug: 'pb0504' },
  { name: 'Shreya Jha', role: 'Full Stack developer and lotss of moral support', githubUsername: 'whoshrey', linkedinSlug: 'shreya-jha-' },
  { name: 'Devyani Dadwal', role: 'AI Lead &  Full Stack developer', githubUsername: 'devyanidadwal', linkedinSlug: 'devyani-dadwal-882484301' },
  { name: 'Piyush Thakur', role: 'Flutter Developer (Mobile apps)', githubUsername: 'Piyush-Fr', linkedinSlug: 'piyushthakur01' },
  { name: 'Tushar Kaushik', role: 'Full Stack developer', githubUsername: 'Tusharkaushik1106', linkedinSlug: 'tushar1106' },
]

type GithubUser = {
  login: string
  avatar_url: string
  html_url: string
  name?: string
  bio?: string
}

async function fetchGithubUser(username: string): Promise<GithubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}` as string, {
      headers: {
        Authorization: process.env.GITHUB_TOKEN ? `Bearer ${process.env.GITHUB_TOKEN}` : '',
        Accept: 'application/vnd.github+json',
      },
      // Cache per build but allow revalidate occasionally if deployed on Vercel
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return (await res.json()) as GithubUser
  } catch {
    return null
  }
}

export default async function AboutPage() {
  const profiles = await Promise.all(
    TEAM.map(async (member) => {
      const gh = await fetchGithubUser(member.githubUsername)
      return { member, gh }
    }),
  )

  return (
    <main className="relative min-h-screen px-6 md:px-8 py-14">
      {/* Decorative background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-[#9ad4ff]/10 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About GrindFlow</h1>
            <p className="mt-3 text-muted max-w-2xl">
              Meet the team behind GrindFlow — a peer-powered study notes platform. We believe in clean
              notes, collaborative learning, and delightful UX.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/puravbhatt0504/grindflow"
                target="_blank"
                className="inline-flex items-center gap-2 btn-primary"
                rel="noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2C6.475 2 2 6.588 2 12.253c0 4.52 2.865 8.35 6.839 9.703c.5.096.683-.22.683-.49c0-.242-.01-1.048-.015-1.901c-2.782.616-3.37-1.215-3.37-1.215c-.455-1.177-1.11-1.49-1.11-1.49c-.908-.64.069-.627.069-.627c1.003.072 1.53 1.05 1.53 1.05c.892 1.57 2.341 1.116 2.91.853c.091-.665.35-1.116.636-1.373c-2.222-.258-4.555-1.144-4.555-5.09c0-1.124.387-2.043 1.021-2.763c-.103-.258-.443-1.3.097-2.71c0 0 .836-.275 2.74 1.055A9.29 9.29 0 0 1 12 6.844c.847.004 1.7.117 2.497.343c1.902-1.33 2.737-1.055 2.737-1.055c.542 1.41.202 2.452.1 2.71c.636.72 1.02 1.639 1.02 2.763c0 3.957-2.337 4.828-4.565 5.082c.36.32.682.948.682 1.912c0 1.38-.013 2.493-.013 2.832c0 .272.18.592.688.49C19.138 20.6 22 16.77 22 12.252C22 6.588 17.523 2 12 2Z"
                  />
                </svg>
                <span>View project on GitHub</span>
              </a>
              <Link href="/" className="btn-ghost">Back to home</Link>
            </div>
            
          </div>
        </div>

        <TeamGrid profiles={profiles} />
      </div>
    </main>
  )
}


