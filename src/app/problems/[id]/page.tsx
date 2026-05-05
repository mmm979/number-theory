import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import MathText from '@/components/MathText'
import CommentForm from '@/components/CommentForm'
import StatusEditor from '@/components/StatusEditor'

export default async function ProblemPage(props: PageProps<'/problems/[id]'>) {
  const { id } = await props.params

  const [{ data: problem }, { data: comments }] = await Promise.all([
    supabase.from('problems').select('*').eq('id', id).single(),
    supabase.from('comments').select('*').eq('problem_id', id).order('created_at'),
  ])

  if (!problem) notFound()

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-start gap-3 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
          <div className="shrink-0 mt-1">
            <StatusEditor problemId={problem.id} current={problem.status as 'unsolved' | 'unclear' | 'solved'} />
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          {new Date(problem.created_at).toLocaleDateString('ja-JP')}
        </p>
        <MathText>{problem.description}</MathText>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          コメント ({comments?.length ?? 0})
        </h2>
        {comments?.map((c) => (
          <div key={c.id} className="border-l-2 border-gray-200 pl-4 mb-6">
            <MathText>{c.content}</MathText>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(c.created_at).toLocaleDateString('ja-JP')}
            </p>
          </div>
        ))}
        <CommentForm problemId={id} />
      </div>
    </div>
  )
}
