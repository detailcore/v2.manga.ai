import mitt from 'mitt'


export const useEventBus = () => {
  const emitter = mitt()

  const emit = emitter.emit // Вызвать все обработчики для данного типа
  const listenOn = emitter.on // Register an event handler
  const listenOff = emitter.off // Remove an event handler

  return {
    emit,
    listenOn,
    listenOff,
  }
}