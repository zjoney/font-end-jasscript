function initializeUpdateQueue(fiber) {
  const queue = {
    baseState: fiber.memoizedState,
    shared: {
      // 共享新的
      pendding: null,
    }
  }
  fiber.updateQueue = queue
}
function enqueueUpdate(fiber, update){
  const updateQueue = fiber.updateQueue
  const shareQueue = updateQueue.shared
  const pendding = shareQueue.pendding;
  if(pendding ===null){
    update.next = update;
  } else {
    update.next = pendding.next;
    pendding.next = update;
    
  }
  shareQueue.pendding = update;
}
module.exports = {
  initializeUpdateQueue,
  enqueueUpdate
}