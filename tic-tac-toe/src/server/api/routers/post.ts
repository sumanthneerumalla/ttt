import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { EventEmitter } from 'events';
import { observable } from '@trpc/server/observable';

interface MyEvents {
  addMove: (data: GameState) => void;
}

declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(
    event: TEv,
    ...args: Parameters<MyEvents[TEv]>
  ): boolean;
}

class MyEventEmitter extends EventEmitter { }

// In a real app, you'd probably use Redis or something
const ee = new MyEventEmitter();


export interface GameState {
  board: number[][],
  playerTurn: number
};

let post = {
  id: 1,
  name: "Hello World",
};

let game: GameState = {
  board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  playerTurn: 1,
}

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      post = { id: post.id + 1, name: input.name };
      return post;
    }),

    createMove: publicProcedure
    .input(z.object({
      board: z.array(z.array(z.number())),
      playerTurn: z.number(),
    }))
    .mutation(async ({ input }) => {
        console.log("here is the input: ", input)
        ee.emit('addMove', input);
    }),

  getLatest: publicProcedure.subscription(() => {
    return observable<GameState>((emit) => {
      //this Event Handler sends latest game state over the socket
      const onAdd = (data: GameState) => {
        console.log("here is the data on emit: ", data)
        emit.next(data);
      };

      //register and deregister event handler on addMove
      ee.on('addMove', onAdd);
      return () => {
        ee.off('addMove', onAdd);
      };
    });
  }),
});
