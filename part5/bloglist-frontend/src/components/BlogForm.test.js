import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('<BlogForm /> calls the event handler it received as props with the right details when a new blog is created', () => {
    const mockHandler = jest.fn()
    const component = render(<BlogForm addBlog={mockHandler} />)
    const title = component.container.querySelector('#titleInput')
    const author = component.container.querySelector('#authorInput')
    const url = component.container.querySelector('#urlInput')
    const addBlogForm = component.container.querySelector('#addBlogForm')
    fireEvent.change(title, {
      target: { value: 'test' },
    })
    fireEvent.change(author, {
      target: { value: 'testPerson' },
    })
    fireEvent.change(url, {
      target: { value: 'test.com' },
    })
    fireEvent.submit(addBlogForm)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('test')
    expect(mockHandler.mock.calls[0][0].author).toBe('testPerson')
    expect(mockHandler.mock.calls[0][0].url).toBe('test.com')
  })

})