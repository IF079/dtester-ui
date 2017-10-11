export class UrlUtils {
  static adornRedirectionUrl(url: string): string {
    if (url == null) {
      return '/';
    }
    if (url[0] !== '/') {
      url = '/' + url;
    }
    return url;
  }

  static trimRedirectionUrl(url: string, restrictedUrls: string[], defaultUrl: string): string {
    return restrictedUrls.filter(restrictedUrl => restrictedUrl === url).length > 0 ? defaultUrl : url;
  }
}
