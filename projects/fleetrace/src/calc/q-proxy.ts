import { TimeConst } from "./time";
import { StatusConst } from "./status";

export class TQProxy
	{
		HighestBibGoesFirst: boolean;

		// in
		Bib: number[] = new Array<number>(1);
		DSQGate: number[] = new Array<number>(1);
		Status: number[] = new Array<number>(1);
		OTime: number[] = new Array<number>(1);

		// out
		ORank: number[] = new Array<number>(1);
		Rank: number[] = new Array<number>(1);
		PosR: number[] = new Array<number>(1);
		PLZ: number[] = new Array<number>(1);

		/** behind best at TimePoint */
		TimeBehind: number[] = new Array<number>(1);

		/** behind previous best at TimePoint */
		TimeBehindPreviousLeader: number[] = new Array<number>(1);

		/** behind previous best at Finish */
		TimeBehindLeader: number[] = new Array<number>(1);

		BestIndex: number;
		BestOTime: number;

		Calc(): void
		{
		}

		IsOut(Value: number): boolean
		{
			return ((Value === StatusConst.Status_DSQ) 
				|| (Value === StatusConst.Status_DNF) 
				|| (Value === StatusConst.Status_DNS));
        }
        
		IsOK(Value: number): boolean
		{
			return ((Value === StatusConst.Status_OK) 
				|| (Value === StatusConst.Status_DSQPending));
        }
        
		get Count(): number
		{
			return this.Rank.length;
    	}
		set Count(value: number)
		{
				if ((value !== this.Rank.length+1) && (value >= 0))
				{
					this.Bib = new Array<number>(value);
					this.DSQGate = new Array<number>(value);
					this.Status = new Array<number>(value);
					this.OTime = new Array<number>(value);
					this.ORank = new Array<number>(value);
					this.Rank = new Array<number>(value);
					this.PosR = new Array<number>(value);
					this.PLZ = new Array<number>(value);
					this.TimeBehind = new Array<number>(value);
					this.TimeBehindPreviousLeader = new Array<number>(value);
					this.TimeBehindLeader = new Array<number>(value);
				}
			
		}
	}

	export class TQProxy1 extends TQProxy
	{

		private Calc_ORank(): void
		{
			for (let j = 0; j < this.Count; j++)
				this.ORank[j] = 1;
			for (let j = 0; j < this.Count; j++)
			{
				const t2: number = this.OTime[j];
				if (t2 <= 0)
					this.ORank[j] = 0;
				else
				{
					for (let l = j + 1; l < this.Count; l++)
					{
						const t1: number = this.OTime[l];
						if (t1 > 0)
						{
							if (t1 < t2)
								this.ORank[j] = this.ORank[j] + 1;
							if (t1 > t2)
								this.ORank[l] = this.ORank[l] + 1;
						}
					}
				}
			}
        }
        
		private Calc_BestIdx(): void
		{
			this.BestIndex = 0;
			this.BestOTime = Number.MAX_SAFE_INTEGER;
			for (let i = 0; i < this.Count; i++)
			{
				const t: number = this.OTime[i];
				if ((t > 0) && (t < this.BestOTime) && this.IsOK(this.Status[i]))
				{
					this.BestIndex = i;
					this.BestOTime = this.OTime[i];
				}
			}
        }
        
		private Calc_TimeBehind(): void
		{
			if (this.BestOTime === TimeConst.TimeNull)
			{
				for (let i = 0; i < this.Count; i++)
					this.TimeBehind[i] = TimeConst.TimeNull;
			}
			else
			{
				for (let i = 0; i < this.Count; i++)
				{
					if (this.OTime[i] > 0)
						this.TimeBehind[i] =  this.OTime[i] - this.BestOTime;
					else
						this.TimeBehind[i] = TimeConst.TimeNull;
				}
			}
        }
        
		private EncodeDSQGateAndStatus(): void
		{
			for (let i = 0; i < this.Count; i++)
			{ 
				let temp: number = this.OTime[i];
				if (this.Status[i] === StatusConst.Status_DNF)
					temp = Number.MAX_SAFE_INTEGER - 300;
				else if (this.Status[i] === StatusConst.Status_DSQ)
					temp = Number.MAX_SAFE_INTEGER - 200;
				else if (this.Status[i] === StatusConst.Status_DNS)
					temp = Number.MAX_SAFE_INTEGER - 100;
				temp = temp - this.DSQGate[i];
				this.OTime[i] = temp;
			}
		}
		private Calc_Rank_PosR_Encoded(): void
		{
            let t1: number; // Zeit1
            let t2: number; // Zeit2
			let BibMerker: number; // wegen 'Highest Bib goes first'

			// reset
			for (let j = 0; j < this.Count; j++)
			{
				this.Rank[j] = 1;
				this.PosR[j] = 1;
				this.PLZ[j] = -1;
			}

			// new calculation
			for (let j = 0; j < this.Count; j++)
			{
				t2 = this.OTime[j];
				BibMerker = this.Bib[j];
				// TimePresent = False
				if (t2 <= 0)
				{
					this.Rank[j] = 0;
					this.PosR[j] = 0;
				}
					// TimePresent
				else
				{
					for(let l = j + 1; l < this.Count; l++)
					{
						t1 = this.OTime[l];
						if (t1 > 0)
						{
							if (t1 < t2)
							{
								// increment Rank and PosR for j
								this.Rank[j] = this.Rank[j] + 1;
								this.PosR[j] = this.PosR[j] + 1;
							}

							if (t1 > t2)
							{
								// increment Rank and PosR for l
								this.Rank[l] = this.Rank[l] + 1;
								this.PosR[l] = this.PosR[l] + 1;
							}

							if (t1 === t2)
							{
								// do not increment Rank if Times are equal
								// increment PosR for one of the riders, j or l
								if (this.HighestBibGoesFirst)
								{
									if (BibMerker > this.Bib[l])
										this.PosR[l] = this.PosR[l] + 1;
									else
										this.PosR[j] = this.PosR[j] + 1;
								}
								else
								{
									if (BibMerker < this.Bib[l])
										this.PosR[l] = this.PosR[l] + 1;
									else
										this.PosR[j] = this.PosR[j] + 1;
								}
							}
						}
					}
					if (this.PosR[j] > 0)
					{
						const temp: number = this.PosR[j];
						this.PLZ[temp-1] = j;
					}
				}
			}
        }
        
		Calc(): void
		{
			this.Calc_ORank();
			this.Calc_BestIdx();
			this.Calc_TimeBehind();
			this.EncodeDSQGateAndStatus();
			this.Calc_Rank_PosR_Encoded();
		}
	}

