interface Capsule {
  capsule_id: string;
  capsule_serial: string;
  status: string;
  original_launch: string | null;
  missions: Mission[];
  landings: number;
  type: string;
  details: string | null;
  reuse_count: number;
}
interface Mission {
  name: string;
  flight: number;
}

export type {Capsule, Mission};
