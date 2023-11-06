FROM xanonymous/kali AS BUILDER

WORKDIR /bof

COPY server.c stack.c Makefile ./

RUN make

FROM xanonymous/kali

ARG LEVEL

WORKDIR /bof

COPY --from=BUILDER /bof/server ./
COPY --from=BUILDER /bof/stack-${LEVEL} ./stack

CMD ["./server"]
