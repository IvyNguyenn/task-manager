import React, { Component } from "react";
import { connect } from "react-redux";
import Control from "../../components/Task/Control";
import List from "../../components/Task/List";
import Item from "../../components/Task/Item";
import TaskModal from "../../components/Modal/TaskModal";
import {
    addTask,
    deleteTask,
    deleteAllTask,
    updateTask,
    toggleTaskStatus,
    setTaskStatus,
    fetchTasksFirebase
} from "../../actions/TaskAction";
import { filterTask } from "../../actions/FilterAction";
import DeleteModal from "../../components/Modal/DeleteModal";
import Pagination from "../../components/Pagination/Pagination";
import * as Status from "../../constrains/StatusTask";
import { firebaseApp } from "../../constrains/firebaseConfig";

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTaskModalOpen: false,
            deleteTask: undefined,
            isDeleteAllTask: false,
            selectTask: undefined,
            keyword: "",
            taskList: []
        };
        this.itemRef = firebaseApp.database();
    }

    addDB = task => {
        this.itemRef.ref("task").push({
            title: task.title,
            content: task.content,
            status: task.status
        });
    };
    removeDB = task => {
        this.itemRef
            .ref("task")
            .child(task.id)
            .remove();
        this.listenForItems();
    };
    updateDB = task => {
        this.itemRef
            .ref("task")
            .child(task.id)
            .update({
                title: task.title,
                content: task.content,
                status: task.status
            });
        this.listenForItems();
    };
    listenForItems = () => {
        let tasks = [];
        this.itemRef.ref("task").on("child_added", dataSnapshot => {
            tasks.push({
                id: dataSnapshot.key,
                title: dataSnapshot.val().title,
                content: dataSnapshot.val().content,
                status: dataSnapshot.val().status
            });
            this.setState({ taskList: tasks });
        });
        this.itemRef.ref("task").on("child_removed", dataSnapshot => {
            tasks = tasks.filter(i => i.id !== dataSnapshot.key);
            this.setState({ taskList: tasks });
        });
        this.itemRef.ref("task").on("child_changed", dataSnapshot => {
            let index = tasks.findIndex(i => i.id === dataSnapshot.key);
            (tasks[index].title = dataSnapshot.val().title),
                (tasks[index].content = dataSnapshot.val().content),
                (tasks[index].status = dataSnapshot.val().status);
            this.setState({ taskList: tasks });
        });
    };
    onToggleTaskModal = () => {
        this.setState({
            isTaskModalOpen: !this.state.isTaskModalOpen,
            deleteTask: undefined,
            selectTask: undefined
        });
    };

    onSubmitTask = task => {
        if (task.id) {
            this.updateDB(task);
        } else {
            this.addDB(task);
        }
    };

    onSelectTask = task => {
        this.setState({ selectTask: task, isTaskModalOpen: true });
    };

    onDeleteTask = (isDeleteAllTask, task) => {
        this.setState({
            deleteTask: task,
            isDeleteAllTask: isDeleteAllTask
        });
    };

    onConfirmDelete = task => {
        let { isDeleteAllTask } = this.state;
        if (task) {
            if (isDeleteAllTask) this.props.onDeleteAllTask();
            else {
                this.removeDB(task);
            }
        }
        this.setState({ deleteTask: undefined });
    };

    onToggleTaskStatus = id => {
        //this.props.onToggleTaskStatus(id);
    };

    onSetTaskStatus = (id, status) => {
        this.props.onSetTaskStatus(id, status);
    };

    onFilterTask = filter => {
        this.props.onFilterTask(filter);
    };

    onSearchTask = keyword => {
        this.setState({ keyword });
    };

    componentDidMount() {
        this.listenForItems();
    }

    render() {
        const {
            isTaskModalOpen,
            deleteTask,
            selectTask,
            keyword,
            taskList
        } = this.state;
        const { filter } = this.props;
        // Filter on tasks
        let filterTasks = [...taskList];
        if (filter.title) {
            filterTasks = filterTasks.filter(
                i =>
                    i.title
                        .toLowerCase()
                        .indexOf(filter.title.toLowerCase()) !== -1
            );
        }
        if (filter.status)
            if (filter.status !== Status.DEFAULT_STATUS)
                filterTasks = filterTasks.filter(
                    i => i.status === filter.status
                );
        // finished filter
        // Search task
        if (keyword) {
            filterTasks = filterTasks.filter(
                i =>
                    i.title.toLowerCase().indexOf(keyword.toLowerCase()) !==
                        -1 ||
                    i.content.toLowerCase().indexOf(keyword.toLowerCase()) !==
                        -1
            );
        }

        return (
            <div className="container">
                <Control
                    onToggleTaskModal={this.onToggleTaskModal}
                    onDeleteTask={this.onDeleteTask}
                    onSearchTask={this.onSearchTask}
                />
                <List onFilterTask={this.onFilterTask}>
                    <Items
                        tasks={filterTasks}
                        onDeleteTask={this.onDeleteTask}
                        onSelectTask={this.onSelectTask}
                        onToggleTaskStatus={this.onToggleTaskStatus}
                        onSetTaskStatus={this.onSetTaskStatus}
                    />
                </List>
                <Pagination />
                <TaskModal
                    isShow={isTaskModalOpen}
                    selectTask={selectTask}
                    onToggleTaskModal={this.onToggleTaskModal}
                    onSubmitTask={this.onSubmitTask}
                />
                <DeleteModal
                    deleteTask={deleteTask}
                    onConfirmDelete={this.onConfirmDelete}
                />
            </div>
        );
    }
}

const Items = props =>
    props.tasks.map((task, index) => {
        return (
            <Item
                key={index}
                index={index + 1}
                task={task}
                onDeleteTask={props.onDeleteTask}
                onSelectTask={props.onSelectTask}
                onToggleTaskStatus={props.onToggleTaskStatus}
                onSetTaskStatus={props.onSetTaskStatus}
            />
        );
    });

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        filter: state.filter
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onFetchTasks: () => dispatch(fetchTasksFirebase()),
//         onAddTask: task => dispatch(addTask(task)),
//         onDeleteTask: id => dispatch(deleteTask(id)),
//         onDeleteAllTask: () => dispatch(deleteAllTask()),
//         onUpdateTask: task => dispatch(updateTask(task)),
//         onToggleTaskStatus: id => dispatch(toggleTaskStatus(id)),
//         onFilterTask: filter => dispatch(filterTask(filter)),
//         onSetTaskStatus: (id, status) => dispatch(setTaskStatus(id, status))
//     };
// };

export default connect(mapStateToProps)(Tasks);
