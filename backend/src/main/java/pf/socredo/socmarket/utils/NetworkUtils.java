package pf.socredo.socmarket.utils;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class NetworkUtils {
  public InetAddress getLocalHost() throws UnknownHostException {
    return InetAddress.getLocalHost();
  }
}
