import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  const blog = {
    url: 'test.com',
    title: 'test',
    author: 'someone',
    likes : 100
  }

  test('renders content', () => {

    const component = render(<Blog blog={blog}/>)
    expect(component.container).toHaveTextContent(
      'test.com'
    )
    expect(component.container).toHaveTextContent(
      'test'
    )
    expect(component.container.user).toBeUndefined()
    expect(component.container.likes).toBeUndefined()
  })

  test('Likes and URL are shown after clicking the button', () => {
    const component = render(<Blog blog={blog}/>)
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('100')
    expect(div).toHaveTextContent('test.com')
  })

  test('clicking the like button twice calls event handler twice', async () => {

    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} updateLike={mockHandler} />)
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})