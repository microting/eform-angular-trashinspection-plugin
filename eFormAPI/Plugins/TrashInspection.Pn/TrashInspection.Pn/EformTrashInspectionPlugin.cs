﻿/*
The MIT License (MIT)

Copyright (c) 2007 - 2019 Microting A/S

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using TrashInspection.Pn.Abstractions;
using TrashInspection.Pn.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microting.eFormApi.BasePn;
using Microting.eFormApi.BasePn.Infrastructure.Database.Extensions;
using Microting.eFormApi.BasePn.Infrastructure.Models.Application;
using Microting.eFormApi.BasePn.Infrastructure.Settings;
using Microting.eFormTrashInspectionBase.Infrastructure.Data.Factories;
using Microting.eFormTrashInspectionBase.Infrastructure.Data;
using TrashInspection.Pn.Infrastructure.Data.Seed;
using TrashInspection.Pn.Infrastructure.Data.Seed.Data;
using TrashInspection.Pn.Infrastructure.Models;
using Microting.eFormApi.BasePn.Infrastructure.Helpers;
using TrashInspection.Pn.Infrastructure.Const;

namespace TrashInspection.Pn
{
    public class EformTrashInspectionPlugin : IEformPlugin
    {
        public string Name => "Microting Trash Inspection Plugin";
        public string PluginId => "eform-angular-trashinspection-plugin";
        public string PluginBaseUrl => "trash-inspection-pn";
        public string PluginPath => PluginAssembly().Location;
        private string _connectionString;
        private string _sdkConnectionString;
        private int _maxParallelism = 1;
        private int _numberOfWorkers = 1;

        public Assembly PluginAssembly()
        {
            return typeof(EformTrashInspectionPlugin).GetTypeInfo().Assembly;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IFractionService, FractionService>();
            services.AddTransient<ISegmentService, SegmentService>();
            services.AddTransient<IInstallationService, InstallationService>();
            services.AddSingleton<ITrashInspectionLocalizationService, TrashInspectionLocalizationService>();
            services.AddTransient<ITrashInspectionService, TrashInspectionService>();
            services.AddTransient<ITrashInspectionPnSettingsService, TrashInspectionPnSettingsService>();
            services.AddTransient<ITransporterService, TransporterService>();
            services.AddTransient<IProducerService, ProducerService>();
            services.AddSingleton<IRebusService, RebusService>();
        }

        public void AddPluginConfig(IConfigurationBuilder builder, string connectionString)
        {
            var seedData = new TrashInspectionConfigurationSeedData();
            var contextFactory = new TrashInspectionPnContextFactory();
            builder.AddPluginConfiguration(
                connectionString, 
                seedData, 
                contextFactory);
        }

        public void ConfigureDbContext(IServiceCollection services, string connectionString)
        {
            _connectionString = connectionString;
            if (connectionString.ToLower().Contains("convert zero datetime"))
            {
                services.AddDbContext<TrashInspectionPnDbContext>(o => o.UseMySql(connectionString,
                    b => b.MigrationsAssembly(PluginAssembly().FullName)));
            }
            else
            {
                services.AddDbContext<TrashInspectionPnDbContext>(o => o.UseSqlServer(connectionString,
                    b => b.MigrationsAssembly(PluginAssembly().FullName)));
            }

            TrashInspectionPnContextFactory contextFactory = new TrashInspectionPnContextFactory();
            var context = contextFactory.CreateDbContext(new[] {connectionString});
            context.Database.Migrate();

            // Seed database
            SeedDatabase(connectionString);

            string temp = context.PluginConfigurationValues
                .SingleOrDefault(x => x.Name == "TrashInspectionBaseSettings:MaxParallelism")?.Value;
            _maxParallelism = string.IsNullOrEmpty(temp) ? 1 : int.Parse(temp);

            temp = context.PluginConfigurationValues
                .SingleOrDefault(x => x.Name == "TrashInspectionBaseSettings:NumberOfWorkers")?.Value;
            _numberOfWorkers = string.IsNullOrEmpty(temp) ? 1 : int.Parse(temp);

            _sdkConnectionString = context.PluginConfigurationValues
                .SingleOrDefault(x => x.Name == "TrashInspectionBaseSettings:SdkConnectionString")?.Value;
        }

        public void Configure(IApplicationBuilder appBuilder)
        {
            var serviceProvider = appBuilder.ApplicationServices;
            IRebusService rebusService = serviceProvider.GetService<IRebusService>();
            Console.WriteLine($"[DBG] EformTrashInspectionPlugin.Configure _sdkConnectionString is {_sdkConnectionString}");
            if (!_sdkConnectionString.Contains("..."))
            {
                rebusService.Start(_sdkConnectionString, _connectionString, _maxParallelism, _numberOfWorkers);
            }

        }

        public MenuModel HeaderMenu(IServiceProvider serviceProvider)
        {
            var localizationService = serviceProvider
                .GetService<ITrashInspectionLocalizationService>();

            var result = new MenuModel();
            result.LeftMenu.Add(new MenuItemModel()
            {
                Name = localizationService.GetString("TrashInspection"),
                E2EId = "",
                Link = "",
                Guards = new List<string>() { TrashInspectionClaims.AccessTrashInspectionPlugin },
                MenuItems = new List<MenuItemModel>()
                {
                    new MenuItemModel()
                    {
                        Name = localizationService.GetString("TrashInspections"),
                        E2EId = "trash-inspection-pn-trash-inspection",
                        Link = "/plugins/trash-inspection-pn/trash-inspections",
                        Guards = new List<string>() { TrashInspectionClaims.AccessTrashInspections },
                        Position = 0,
                    },
                    new MenuItemModel()
                    {
                        Name = localizationService.GetString("Installations"),
                        E2EId = "trash-inspection-pn-installations",
                        Link = "/plugins/trash-inspection-pn/installations",
                        Guards = new List<string>() { TrashInspectionClaims.AccessInstallations },
                        Position = 1,
                    },
                    new MenuItemModel()
                    {
                        Name = localizationService.GetString("Fractions"),
                        E2EId = "trash-inspection-pn-fractions",
                        Link = "/plugins/trash-inspection-pn/fractions",
                        Guards = new List<string>() { TrashInspectionClaims.AccessFractions },
                        Position = 2,
                    },
                    new MenuItemModel()
                    {
                        Name = localizationService.GetString("Segments"),
                        E2EId = "trash-inspection-pn-segments",
                        Link = "/plugins/trash-inspection-pn/segments",
                        Guards = new List<string>() { TrashInspectionClaims.AccessSegments },
                        Position = 3,
                    },
                    new MenuItemModel()
                    {
                        Name = localizationService.GetString("Producers"),
                        E2EId = "trash-inspection-pn-producers",
                        Link = "/plugins/trash-inspection-pn/producers",
                        Guards = new List<string>() { TrashInspectionClaims.AccessProducers },
                        Position = 4,
                    },
                    new MenuItemModel()
                    {
                        Name = localizationService.GetString("Transporters"),
                        E2EId = "trash-inspection-pn-transporters",
                        Link = "/plugins/trash-inspection-pn/transporters",
                        Guards = new List<string>() { TrashInspectionClaims.AccessTransporters },
                        Position = 5,
                    },
                    new MenuItemModel()
                    {
                        Name = localizationService.GetString("Reports"),
                        E2EId = "trash-inspection-pn-reports",
                        Link = "/plugins/trash-inspection-pn/reports",
                        Guards = new List<string>() { TrashInspectionClaims.AccessReports },
                        Position = 6,
                    }
                }
            });
            return result;
        }

        public void SeedDatabase(string connectionString)
        {
            var contextFactory = new TrashInspectionPnContextFactory();
            using (var context = contextFactory.CreateDbContext(new []{connectionString}))
            {
                TrashInspectionPluginSeed.SeedData(context);
            }
        }

        public void ConfigureOptionsServices(IServiceCollection services, IConfiguration configuration)
        {
            services.ConfigurePluginDbOptions<TrashInspectionBaseSettings>(
                configuration.GetSection("TrashInspectionBaseSettings"));
        }

        public PluginPermissionsManager GetPermissionsManager(string connectionString)
        {
            var contextFactory = new TrashInspectionPnContextFactory();
            var context = contextFactory.CreateDbContext(new[] { connectionString });

            return new PluginPermissionsManager(context);
        }
    }
}