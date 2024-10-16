export const TODO_FILTERS = {
    ALL: 'all',
    LOW:'low',
    MEDIUM:'medium',
    HIGH:'high',
} as const

export const FILTERS_BUTTONS = {
    [TODO_FILTERS.ALL] : {
      text: 'All',
      href: `/?filter=${TODO_FILTERS.ALL}`
    },
    [TODO_FILTERS.LOW] : {
      text: 'Low',
      href: `/?filter=${TODO_FILTERS.LOW}`
    },
    [TODO_FILTERS.MEDIUM] : {
      text: 'Medium',
      href: `/?filter=${TODO_FILTERS.MEDIUM}`
      },
      [TODO_FILTERS.HIGH] : {
        text: 'High',
        href: `/?filter=${TODO_FILTERS.HIGH}`
        }
      
  } as const