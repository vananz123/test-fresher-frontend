/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch, SetStateAction } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { useState } from 'react'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */
const Index = () => {
  const [valueFilter, setValueFilter] = useState<ValueFilter[]>([
    'completed',
    'pending',
  ])
  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>
        <div className="pt-10">
          <FilterTab onSetValue={setValueFilter} />
        </div>
        <div className="pt-10">
          <TodoList valueFilter={valueFilter} />
        </div>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}
//QUESTION 6
export type ValueFilter = 'completed' | 'pending'
interface ListFilterTab {
  key: string | number
  value: ValueFilter[]
  text: string
}
const listFilterTab: ListFilterTab[] = [
  {
    value: ['completed', 'pending'],
    key: 1,
    text: 'All',
  },
  {
    key: 2,
    value: ['pending'],
    text: 'Pending',
  },
  {
    key: 3,
    value: ['completed'],
    text: 'Completed',
  },
]
const FilterTab = ({
  onSetValue,
}: {
  onSetValue: Dispatch<SetStateAction<ValueFilter[]>>
}) => {
  return (
    <Tabs.Root
      onValueChange={(e) => {
        const value = listFilterTab.find((x) => x.key === Number(e))
        if (value) {
          onSetValue(value.value)
        }
      }}
      defaultValue={'1'}
      className="h-[44px] w-full"
    >
      <Tabs.List>
        {listFilterTab.map((e) => (
          <Tabs.Trigger
            key={e.key}
            className="mr-[8px] rounded-full border border-gray-200 px-[24px] py-[12px] text-[14px] font-bold text-gray-700 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            value={`${e.key}`}
          >
            {e.text}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}
export default Index
