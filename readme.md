First, start minikube:

```bash
minikube start
```

Then, apply the following:

```bash
kubectl apply -f postgres-secret.yaml
kubectl apply -f postgres-config.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f app-deployment.yaml
```

Check if all pods are running:

```bash
kubectl get pods
```

Then call:

```bash
minikube service tommy-iykra-app-service
```

Then the app URL will be displayed on the second table in the terminal, it should be something like:

```bash
http://127.0.0.1:57403
```

> Note: Because we are using minikube we have to use tunneling to access the app, the network is limited if using the Docker driver on Darwin, Windows, or WSL, and the Node IP is not reachable directly.
