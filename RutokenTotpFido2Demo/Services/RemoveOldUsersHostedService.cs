namespace RutokenTotpFido2Demo;

public class RemoveOldUsersHostedService : IHostedService, IDisposable
{
    private int executionCount = 0;
    private readonly ILogger<RemoveOldUsersHostedService> _logger;
    private Timer? _timer = null;
    private readonly IServiceScopeFactory _serviceScope;

    public RemoveOldUsersHostedService(
        IServiceScopeFactory serviceScope, 
        ILogger<RemoveOldUsersHostedService> logger)
    {
        _logger = logger;
        _serviceScope = serviceScope;
    }

    public Task StartAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Timed Hosted Service running.");

        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));

        return Task.CompletedTask;
    }

    private void DoWork(object? state)
    {
        var count = Interlocked.Increment(ref executionCount);

        using (var scope = _serviceScope.CreateScope())
        {
            var dbService = scope.ServiceProvider.GetRequiredService<EfDbContext>();
            var date = DateTime.UtcNow.AddDays(-2);
            try
            {
                var users = dbService.Users.Where(c => c.RegisterDate <= date);
                dbService.Users.RemoveRange(users);
                dbService.SaveChanges();
            }
            catch (Exception e)
            {
                // ignored
            }
        }

        _logger.LogInformation(
            "Timed Hosted Service is working. Count: {Count}", count);
    }

    public Task StopAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Timed Hosted Service is stopping.");

        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}