import { firebaseApp } from "../../constrains/firebaseConfig";

const itemRef = firebaseApp.database();

export const fetchDB = async () => {
    let tasks = [];
    await itemRef.ref("task").on("child_added", dataSnapshot => {
        tasks.push({
            id: dataSnapshot.key,
            title: dataSnapshot.val().title,
            content: dataSnapshot.val().content,
            status: dataSnapshot.val().status
        });
    });
    console.log(tasks);
    return tasks;
};

export const addDB = async task => {
    await itemRef.ref("task").push({
        title: task.title,
        content: task.content,
        status: task.status
    });
};

export const removeDB = async task => {
    await itemRef
        .ref("task")
        .child(task.id)
        .remove();
};

export const updateDB = async task => {
    await itemRef
        .ref("task")
        .child(task.id)
        .update({
            title: task.title,
            content: task.content,
            status: task.status
        });
};

// const listenForItems = () => {
//     let tasks = [];
//     this.itemRef.ref("task").on("child_added", dataSnapshot => {
//         tasks.push({
//             id: dataSnapshot.key,
//             title: dataSnapshot.val().title,
//             content: dataSnapshot.val().content,
//             status: dataSnapshot.val().status
//         });
//         this.setState({ taskList: tasks });
//     });
//     this.itemRef.ref("task").on("child_removed", dataSnapshot => {
//         tasks = tasks.filter(i => i.id !== dataSnapshot.key);
//         this.setState({ taskList: tasks });
//     });
//     this.itemRef.ref("task").on("child_changed", dataSnapshot => {
//         let index = tasks.findIndex(i => i.id === dataSnapshot.key);
//         (tasks[index].title = dataSnapshot.val().title),
//             (tasks[index].content = dataSnapshot.val().content),
//             (tasks[index].status = dataSnapshot.val().status);
//         this.setState({ taskList: tasks });
//     });
// };
