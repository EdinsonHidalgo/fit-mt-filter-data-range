import React from 'react'
import Title from '../form/title' 
import FilterDateRange from '../form/filter-date-range'

const HomeView = () => {
  return (
    <div>
      <Title text='Filtro de datos'></Title>
      <FilterDateRange></FilterDateRange>
    </div>
  )
}

export default HomeView

