import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class RouteReuse extends RouteReuseStrategy {
  handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.handlers[route.url.join("/") || route.parent.url.join("/")];
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const segments = route.url.map(value => value.toString());
    return (
      segments.includes("new-training") ||
      segments.includes("new-match") ||
      segments.includes("new-event")
    );
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    this.handlers[route.routeConfig.path] = handle;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig) {
      return null;
    }
    return this.handlers[route.routeConfig.path];
  }
}
