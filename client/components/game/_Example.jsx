// https://react-in-meteor.readthedocs.org/en/latest/meteor-data /
// var TodoListLoader = React.createClass({
//   mixins: [ReactMeteorData],
//   getMeteorData() {
//     // This is the place to subscribe to any data you need
//     var handle = Meteor.subscribe("todoList", this.props.id);
//
//     return {
//       todoListLoading: ! handle.ready(), // Use handle to show loading state
//       todoList: TodoLists.findOne(this.props.id),
//       todoListTasks: Tasks.find({listId: this.props.id}).fetch()
//     };
//   },
//   render() {
//     // Show a loading indicator if data is not ready
//     if (this.data.todoListLoading) {
//       return <LoadingSpinner />;
//     }
//
//     // Render a component and pass down the loaded data
//     return (
//       <TodoList
//         list={this.data.todoList}
//         tasks={this.data.todoListTasks} />
//     );
//   }
// });
