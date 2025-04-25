package pf.socredo.socmarket;

import java.net.UnknownHostException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;

import pf.socredo.socmarket.utils.NetworkUtils;

@SpringBootApplication
@ComponentScan(basePackages = { "pf.socredo.socmarket", "pf.socredo.socmarket.services" })
public class SocMarketApplication {
	private static final Logger logger = LoggerFactory.getLogger(SocMarketApplication.class);
	private static NetworkUtils networkUtils = new NetworkUtils();

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(SocMarketApplication.class);
		Environment env = app.run(args).getEnvironment();
		logApplicationStartup(env);
	}

	public static void setNetworkUtils(NetworkUtils utils) {
		networkUtils = utils;
	}

	public static void resetNetworkUtils() {
		networkUtils = new NetworkUtils();
	}

	static void logApplicationStartup(Environment env) {
		String protocol = env.getProperty("server.ssl.key-store") != null ? "https" : "http";
		String serverPort = env.getProperty("server.port", "8080");
		String hostAddress = "localhost";

		try {
			hostAddress = networkUtils.getLocalHost().getHostAddress();
		} catch (UnknownHostException e) {
			logger.warn("The host name could not be determined, using `localhost` as fallback");
		}

		logger.info("""

				----------------------------------------------------------
				Application '{}' is running! Access URLs:
				Local: \t\t{}://localhost:{}
				External: \t{}://{}:{}
				Profile(s): \t{}
				----------------------------------------------------------
				""",
				env.getProperty("spring.application.name", "Socredo Market [undefined]"),
				protocol,
				serverPort,
				protocol,
				hostAddress,
				serverPort,
				env.getActiveProfiles());
	}
}
