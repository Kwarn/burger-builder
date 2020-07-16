import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({ adapter: new Adapter() })

describe('<BurgerBuilder />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
  })

  it('should render <BuildControls /> when ingredients is not null', ()=>{
    wrapper.setProps({ingredients: {salad: 0, cheese: 0, bacon: 0, meat: 0}})
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  })
  it('should not render <BuildControls /> if ingredients are null', ()=>{
    wrapper.setProps({ingredients: null})
    expect(wrapper.find(BuildControls)).toHaveLength(0)
  })
})
