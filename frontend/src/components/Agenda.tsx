import type { FarmDay, FarmItem } from "../types/farm";

type AgendaProps = {
  items: FarmItem[];
};

type DayColumn = {
  day: FarmDay;
  date: string;
};

const week: DayColumn[] = [
  { day: "Seg", date: "8" },
  { day: "Ter", date: "9" },
  { day: "Qua", date: "10" },
  { day: "Qui", date: "11" },
  { day: "Sex", date: "12" },
  { day: "Sáb", date: "13" },
  { day: "Dom", date: "14" },
];

const taskColors: Record<FarmItem["kind"], string> = {
  Talento: "border-violet-400 bg-violet-50",
  Arma: "border-amber-400 bg-amber-50",
  Inimigo: "border-emerald-400 bg-emerald-50",
  "Chefe semanal": "border-rose-400 bg-rose-50",
};

function Agenda({ items }: AgendaProps) {
  return (
    <section className="mt-11">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[.125em] text-[#8e8798]">
            SUA SEMANA
          </p>
          <h2 className="font-['Fraunces'] text-[27px] font-bold tracking-tight">
            Agenda de farm
          </h2>
        </div>
        <button className="rounded-md border border-[#e2dfe7] bg-white px-3 py-2 text-[11px] text-[#696272]">
          ‹ &nbsp; 8–14 de setembro &nbsp; ›
        </button>
      </div>
      <div className="overflow-x-auto pb-3">
        <div className="grid min-w-[1290px] grid-7 gap-3">
          {week.map(({ day, date }, index) => {
            const tasks = items.filter((item) => item.days.includes(day));
            return (
              <div
                className="min-h-[380px] overflow-hidden rounded-xl border border-[#ebe9f0] bg-white"
                key={day}
              >
                <div
                  className={`border-b border-[#f0edf3] px-4 py-4 ${index === 0 ? "bg-[#f4ecff]" : ""}`}
                >
                  <small className="block font-mono text-[10px] text-[#8b8495] uppercase">
                    {day}
                  </small>
                  <b
                    className={`mt-1 block font-['Fraunces'] text-[22px] ${index === 0 ? "text-[#70449e]" : ""}`}
                  >
                    {date}
                  </b>
                </div>
                <div className="space-y-2 p-3">
                  {tasks.length ? (
                    tasks.map((item) => (
                      <article
                        className={`flex min-h-[70px] gap-2 rounded-md border-l-[3px] p-2 ${taskColors[item.kind]}`}
                        key={item.name}
                      >
                        <span className="text-base">{item.icon}</span>
                        <div>
                          <b className="block text-xs leading-tight">
                            {item.name}
                          </b>
                          <small className="mt-1 block text-[10px] text-[#756e7e]">
                            {item.kind}
                          </small>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="pt-20 text-center text-xs text-[#bbb4c1]">
                      Dia livre
                      <br />
                      <span className="text-[10px]">sem domínio</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Agenda;
