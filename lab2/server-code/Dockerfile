FROM xanonymous/kali AS BUILDER

WORKDIR /bof

COPY server.c stack.c Makefile ./

RUN make

FROM xanonymous/kali

ARG LEVEL

WORKDIR /bof

COPY --from=BUILDER /bof/server /bof/stack-${LEVEL} ./
COPY server.c stack.c Makefile ./
# COPY server .
# COPY stack-${LEVEL} .

CMD ["tail", "-f", "/dev/null"]
