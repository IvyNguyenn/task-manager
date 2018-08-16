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
    toggleTaskStatus
} from "../../actions/TaskAction";
import { filterTask } from "../../actions/FilterAction";
import DeleteModal from "../../components/Modal/DeleteModal";
import Pagination from "../../components/Pagination/Pagination";
import * as Status from "../../constrains/StatusTask";

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTaskModalOpen: false,
            deleteTask: undefined,
            isDeleteAllTask: false,
            selectTask: undefined,
            keyword: ""
        };
    }

    onToggleTaskModal = () => {
        this.setState({
            isTaskModalOpen: !this.state.isTaskModalOpen,
            deleteTask: undefined,
            selectTask: undefined
        });
    };

    onSubmitTask = task => {
        if (task.id) {
            this.props.onUpdateTask(task);
        } else {
            this.props.onAddTask(task);
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
            else this.props.onDeleteTask(task.id);
        }
        this.setState({ deleteTask: undefined });
    };

    onToggleTaskStatus = id => {
        this.props.onToggleTaskStatus(id);
    };

    onFilterTask = filter => {
        this.props.onFilterTask(filter);
    };

    onSearchTask = keyword => {
        this.setState({ keyword });
    };

    render() {
        const { isTaskModalOpen, deleteTask, selectTask, keyword } = this.state;
        const { tasks, filter } = this.props;
        // Filter on tasks
        let filterTasks = [...tasks];
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
            <div className="container" style={{ width: "60%" }}>
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
            />
        );
    });

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        filter: state.filter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTask: task => dispatch(addTask(task)),
        onDeleteTask: id => dispatch(deleteTask(id)),
        onDeleteAllTask: () => dispatch(deleteAllTask()),
        onUpdateTask: task => dispatch(updateTask(task)),
        onToggleTaskStatus: id => dispatch(toggleTaskStatus(id)),
        onFilterTask: filter => dispatch(filterTask(filter))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tasks);
