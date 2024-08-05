import { useEffect, useRef, useState } from 'react'

import { api } from '@/utils/client/api'

/**
 * QUESTION 1:
 * -----------
 * Style the "Add" button so that it looks like the design in Figma.
 *
 * NOTE: You must use tailwindcss and className. Do not use other methods (eg.
 * inline styles, separate css files, css modules, etc.) unless absolutely
 * necessary. This applies to all styling-related questions in this assignment.
 *
 * Documentation references:
 *  - https://tailwindcss.com
 *  - https://www.youtube.com/watch?v=mr15Xzb1Ook
 *
 *
 *
 * QUESTION 2:
 * -----------
 * Currently our form is not keyboard accessible. Users cannot hit
 * <Enter> right after typing to submit the form (add new todo). Fix this issue.
 */

export const CreateTodoForm = () => {
  const [todoBody, setTodoBody] = useState('')

  const apiContext = api.useContext()

  const { mutate: createTodo, isLoading: isCreatingTodo } =
    api.todo.create.useMutation({
      onSuccess: () => {
        apiContext.todo.getAll.refetch()
      },
    })
  //QUESTION 2
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleKey = (e: KeyboardEvent) => {
    if (inputRef && e.key ==='Enter') {
      e.preventDefault()
      inputRef.current?.focus()
    }
  }
  useEffect(() => {
    if (inputRef.current !== document.activeElement) {
      document.addEventListener('keydown', handleKey)
      return () => document.removeEventListener('keydown', handleKey)
    }
  },[inputRef])
  return (
    <form className="group flex items-center justify-between rounded-12 border border-gray-200 py-2 pr-4 focus-within:border-gray-400">
      <label htmlFor={TODO_INPUT_ID} className="sr-only">
        Add todo
      </label>

      <input
        id={TODO_INPUT_ID}
        ref={inputRef}
        type="text"
        placeholder="Add todo"
        value={todoBody}
        onChange={(e) => {
          setTodoBody(e.target.value)
        }}
        onFocus={(e) => {
          e.preventDefault()
        }}
        onKeyDown={(e) => {
          // bouns feature press enter add todo
          if (e.key === 'Enter' && todoBody != '') {
            e.preventDefault()
            createTodo({
              body: todoBody,
            })
            setTodoBody('')
          }
        }}
        className="flex-1 px-4 text-base placeholder:text-gray-400 focus:outline-none"
      />

      <button
        className="rounded-full bg-gray-700 px-[20px] py-[8px] text-[14px] font-bold text-white"
        type="button"
        disabled={isCreatingTodo}
        onClick={() => {
          createTodo({
            body: todoBody,
          })
          setTodoBody('')
        }}
      >
        Add
      </button>
    </form>
  )
}

const TODO_INPUT_ID = 'todo-input-id'
