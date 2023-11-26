FROM handsonsecurity/seed-ubuntu:small AS BUILDER

WORKDIR /bof

COPY server.c stack.c Makefile ./

RUN apt update -y \
    && apt full-upgrade -y \
    && apt autoremove -y \
    && apt install -y build-essential gcc-multilib \
    && make

FROM handsonsecurity/seed-ubuntu:small

ARG LEVEL

WORKDIR /bof

# RUN echo 0 | sudo tee /proc/sys/kernel/randomize_va_space
COPY --from=BUILDER /bof/server ./
COPY --from=BUILDER /bof/stack-${LEVEL} ./stack

CMD ["./server"]
