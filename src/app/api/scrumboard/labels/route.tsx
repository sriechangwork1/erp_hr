import labelList from '@crema/fakedb/apps/scrumboard/labelList';

export const GET = async () => {
  try {
    return new Response(JSON.stringify(labelList), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

// export const PUT = async (request) => {
//     try {
//         const reqBody = await request.json()
//         const { taskIds, type } = reqBody;
//         todoData = todoData.map((task) => {
//             if (taskIds.includes(task.id)) {
//                 if (task.label.some((label) => label.id === +type)) {
//                     task.label = task.label.filter((label) => label.id !== +type);
//                     return task;
//                 } else {
//                     task.label = task.label.concat(onGetLabel(type));
//                     return task;
//                 }
//             } else {
//                 return task;
//             }
//         });
//         const updatedTasks = todoData.filter((task) => taskIds.includes(task.id));
//         return new Response(JSON.stringify(updatedTasks), {status: 200})
//
//     } catch (error) {
//         return new Response("Internal Server Error", {status: 500});
//     }
// }
