using Microsoft.Extensions.Configuration;
namespace fakeboxd;

public class Config
{
	public static string URL { get; }
	public static string BearerToken { get; }

	static Config()
	{
		var config = new ConfigurationBuilder()
	   .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
	   .AddJsonFile("appsettingsDevelopment.json", optional: false, reloadOnChange: true)
	   .Build();

		URL = config["ApiSettings:BaseURL"];
		BearerToken = config["ApiSettings:BearerToken"];
	}
}
