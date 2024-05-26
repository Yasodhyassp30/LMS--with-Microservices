import { Eureka } from "eureka-js-client";
import { APP_HOST, APP_PORT } from "./configs/configs.js";

const eurekaClient = new Eureka({
  instance: {
    app: "lms-service",
    instanceId: "file-service-v1",
    hostName: APP_HOST,
    ipAddr: "127.0.0.1",
    statusPageUrl: `http://${APP_HOST}:${APP_PORT}/status`,
    port: {
      $: APP_PORT,
      "@enabled": true,
    },
    vipAddress: "lms-service",
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    host: "localhost",
    port: 8761,
    servicePath: "/eureka/apps/",
  },
});

const startEurekaClient = () => {
    eurekaClient.start((error) => {
      if (error) {
        console.error("Error starting Eureka client:", error);
      } else {
        console.log("Node.js service registered with Eureka");
      }
    });
  };
  
  export { eurekaClient, startEurekaClient };
