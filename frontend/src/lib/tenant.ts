export function getTenantDomain(request: Request): string {
  const host = request.headers.get("host");

  if (!host) {
    throw new Error("Unable to determine tenant domain");
  }

  // Remove localhost port / production port
  return host.split(":")[0].toLowerCase();
}