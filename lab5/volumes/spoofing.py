import struct
from typing import Final
from time import time
from string import ascii_letters

from scapy.layers.inet import IP, ICMP
from scapy.sendrecv import send
from scapy.packet import Raw

# We should use the IP of the host machine, not the container.
# Because the machine network is in "host" mode.
FAKE_SENDER_IP: Final[str] = "192.168.65.1"


def create_ping_packet_of(ip: str, /, *, dst: str) -> IP:
    ip_packet_ = IP()
    ip_packet_.src = ip

    if dst is not None:
        ip_packet_.dst = dst

    icmp_ = ICMP()
    icmp_.type = "echo-request"
    icmp_.code = 0
    icmp_.id = 0x1234
    icmp_.seq = 1

    payload = struct.pack("d", time()) + ascii_letters.encode()[:40]

    if len(payload) > 56:
        payload = payload[:56]
    elif len(payload) < 56:
        payload += b"\x00" * (56 - len(payload))

    return ip_packet_ / icmp_ / Raw(load=payload)


if __name__ == "__main__":
    ip_packet = create_ping_packet_of(FAKE_SENDER_IP, dst="8.8.8.8")
    send(ip_packet, loop=1, count=5)
    print(ip_packet)
