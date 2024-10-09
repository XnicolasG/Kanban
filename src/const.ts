export const TODO_FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
} as const

export const FILTERS_BUTTONS = {
    [TODO_FILTERS.ALL] : {
      text: 'All',
      href: `/?filter=${TODO_FILTERS.ALL}`
    },
    [TODO_FILTERS.ACTIVE] : {
      text: 'Active',
      href: `/?filter=${TODO_FILTERS.ACTIVE}`
    },[TODO_FILTERS.COMPLETED] : {
      text: 'Completed',
      href: `/?filter=${TODO_FILTERS.COMPLETED}`
    },
  } as const