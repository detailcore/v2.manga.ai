import mitt from 'mitt'

export default defineNuxtPlugin(() => {
  const emitter = mitt()

  return {
    provide: {
      event: emitter.emit, // Будет генерировать событие
      listenOn: emitter.on, // Зарегистрирует слушателя для события
      listenOff: emitter.off, // Remove an event handler for the given type.
    }
  }
})