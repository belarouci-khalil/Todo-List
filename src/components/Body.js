import React, { useState } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Body.css'

const Body = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <Container className="mt-5 contain">
      <Form>
        <Form.Group>
          <Form.Control 
          className='input d-flex justify-content-center align-items-center'
            type="text"
            placeholder="Enter a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </Form.Group>
        <div className=''>
        <Button variant="primary btnn" onClick={addTodo}>
          Add Todo 
        </Button>
        </div>
      </Form>
      <ListGroup className="mt-3">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <ListGroup.Item
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Form.Check
                          type="checkbox"
                          label={todo.text}
                          checked={todo.completed}
                          onChange={() => toggleComplete(todo.id)}
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          className="float-right delete-button dell"
                          onClick={() => deleteTodo(todo.id)}
                        >

                          Delete
                        </Button>
                      </ListGroup.Item>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ListGroup>
    </Container>
  );
};

export default Body;
