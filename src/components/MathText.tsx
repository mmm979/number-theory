'use client'
import Markdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function MathText({ children }: { children: string }) {
  return (
    <div className="prose prose-sm max-w-none">
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {children}
      </Markdown>
    </div>
  )
}
