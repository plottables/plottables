import coreContract from "@/lib/coreContract";

export default async function getScript(projectId: string): Promise<string> {
  const scriptInfo = await coreContract.methods
    .projectScriptInfo(projectId)
    .call();

  let script = "";
  for (let i = 0; i < Number(scriptInfo.scriptCount); i++) {
    const s = await coreContract.methods
      .projectScriptByIndex(projectId, i)
      .call();
    script += s;
  }

  return script;
}
