import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';


class App extends Component {

    state={
        input: '',   //input 초기화 ('')
        todos: [{id:0, text: '리액트 공부하기', done:true},   
                {id:1, text: '컴포넌트 스타일링 해보기', done:false}]   //객체 배열 (미리 렌더링 되어있는 부분들)
    }

    id = 1
    //작성될 사항들에게 key값 부여하는 메소드
    getId = () => {
        return ++this.id;
    }

  
    handleChange=(e)=>{
      // const {value}=e.target;
        this.setState({
            input: e.target.value
        });
    }

    
    handleInsert = () => {
       // const { todos, input } = this.state;

       //새로운 일정들 추가하는 부분
        const newTodo = {
            text: this.state.input,
            done: false,
            id: this.getId()
        };

        //배열에 객체 추가하고 다시 input 초기화
        this.setState({
            todos: [...this.state.todos, newTodo], 
            input: ''
        });
    }

    //체크박스를 끄고 키는 함수
    handleToggle = (id) => {

       // const { todos } = this.state;
        const index = this.state.todos.findIndex(todo => todo.id === id); //map함수의 배열=todo

        const toggled = {
            ...this.state.todos[index],
            done: !this.state.todos[index].done  //박스 체크하기
        };

        this.setState({
            todos: [
                ...this.state.todos.slice(0,index),
                toggled,
                ...this.state.todos.slice(index + 1, this.state.todos.length)
            ]
        });
    }

    handleRemove = (id) => {
        const { todos } = this.state;
        const index = todos.findIndex(todo => todo.id === id);  //선택한 아이디와 값이 일치하는지 찾기
    
        this.setState({
            todos: [
                ...todos.slice(0, index),
                ...todos.slice(index + 1, todos.length)
            ]
        });
    }



    render() {

       // const{input}=this.state; -> 자식 props로 보내주기 쉽게 state값에 변수이름을 줌

        // const{
        //     handleChange -> 자식 props로 보내주기 쉽게 이벤트 함수에 변수이름을 줌
        // }=this;

        return (
           <PageTemplate>
               <TodoInput onChange={this.handleChange} value={this.state.input} onInsert={this.handleInsert} />
               <TodoList todos={this.state.todos} onToggle={this.handleToggle} onRemove={this.handleRemove} />
           </PageTemplate>
        );
    }
}

export default App;