
const { initializeUpdateQueue, enqueueUpdate } = require('./ReactUpdateQueue');
const { SyncLane, SyncBatchLane } = require('./ReactFiberLane')
// 定义一个fiber，节点有一个状态
const fiber = {
  memoizedState: { msg: '' }
}
// 当创建一个fiber 会为它厨师一个更新队列
initializeUpdateQueue(fiber);
let update1 = { name: 'update1', payload: (state) => ({ msg: state.msg + 'A' }), lane: SyncBatchLane };
enqueueUpdate(fiber, update1);
let update2 = { name: 'update2', payload: (state) => ({ msg: state.msg + 'B' }), lane: SyncLane };
enqueueUpdate(fiber, update2);
let update3 = { name: 'update3', payload: (state) => ({ msg: state.msg + 'C' }), lane: SyncBatchLane };
enqueueUpdate(fiber, update3);
let update4 = { name: 'update4', payload: (state) => ({ msg: state.msg + 'D' }), lane: SyncLane };
enqueueUpdate(fiber, update4);
function output(updateQueue) {
  let lastUpdate = updateQueue.shared.pendding;
  let firstUpdate = lastUpdate.next;
  do {
    console.log(lastUpdate.name);
    lastUpdate = lastUpdate.next;
  } while (lastUpdate && lastUpdate !== firstUpdate)
}
console.log(output(fiber.updateQueue))