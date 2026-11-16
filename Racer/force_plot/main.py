"""Force + velocity traces for the Racer sim.

Reproduces Racer/physics.js in 1-D (forward only, no steering) so the three
forces acting on the car can be watched over time:

    traction  =  throttle * maxEngineForce      (drives the car)
    drag      = -Cdrag * v * |v|                (quadratic, dominates at speed)
    rolling   = -Crr * v                        (linear, dominates at low speed)
    net       =  traction + drag + rolling      -> a = net / mass

Integration matches Racer/car.js (State.update): plain forward Euler at the
same fixed dt the sketch uses.

Two throttle programs are compared:
    1. constant engine force  (full throttle from t = 0)
    2. trapezoid throttle: ramp up to maxEngineForce, hold, ramp back down
       to zero, then coast — each phase length set independently

Run:  python3 main.py
"""

from matplotlib import pyplot
from matplotlib.ticker import MaxNLocator
import numpy as np


# --- Model constants -------------------------------------------------------
# Mirrors Racer/car.js and Racer/physics.js. Change these here to see how the
# simulation would respond before touching the JS.

MASS = 10.0                 # car.js  : this.mass
MAX_ENGINE_FORCE = 1000.0   # car.js  : this.maxEngineForce
CDRAG = 0.4257              # physics.js : this.Cdrag
CRR = CDRAG * 30            # physics.js : this.Crr

TOTAL_TIME = 15.0           # seconds — length of the plotted window
DELTA_T = 0.1               # mySketch.js : car.step(0.1, forces)

# Trapezoid throttle profile, all independent of TOTAL_TIME. Whatever window
# is left after the three phases is coasting with the engine off.
RAMP_UP_TIME = 5.0          # seconds : 0 -> full throttle
HOLD_TIME = 5.0             # seconds : held at full throttle
RAMP_DOWN_TIME = 3.0        # seconds : full throttle -> 0

DARK = True                # flip for the dark-surface version of the figure


# --- Simulation ------------------------------------------------------------

def constant_engine_force(t):
    """Full throttle from the first frame."""
    return MAX_ENGINE_FORCE


def ramping_engine_force(t):
    """Trapezoid: ramp up to full, hold, ramp back down to zero, then coast.

    Each phase can be zeroed out independently — a 0-length ramp is a step,
    a 0-length hold turns the profile into a triangle.
    """
    if t < RAMP_UP_TIME:
        return MAX_ENGINE_FORCE * t / RAMP_UP_TIME if RAMP_UP_TIME > 0 else MAX_ENGINE_FORCE

    t -= RAMP_UP_TIME
    if t < HOLD_TIME:
        return MAX_ENGINE_FORCE

    t -= HOLD_TIME
    if t < RAMP_DOWN_TIME:
        return MAX_ENGINE_FORCE * (1.0 - t / RAMP_DOWN_TIME)

    return 0.0


def simulate(engine_force):
    """Step the 1-D car and record every force plus velocity at each frame.

    Returns a dict of equal-length arrays keyed by series name.
    """
    steps = int(round(TOTAL_TIME / DELTA_T)) + 1
    t = np.arange(steps) * DELTA_T

    traction = np.zeros(steps)
    drag = np.zeros(steps)
    rolling = np.zeros(steps)
    net = np.zeros(steps)
    velocity = np.zeros(steps)

    vel = 0.0
    for i in range(steps):
        f_traction = engine_force(t[i])
        f_drag = -CDRAG * vel * abs(vel)
        f_rolling = -CRR * vel
        f_net = f_traction + f_drag + f_rolling

        traction[i] = f_traction
        drag[i] = f_drag
        rolling[i] = f_rolling
        net[i] = f_net
        velocity[i] = vel

        # forward Euler, same as State.update()
        vel += (f_net / MASS) * DELTA_T

    return {
        "t": t,
        "Traction": traction,
        "Drag": drag,
        "Rolling resistance": rolling,
        "Net": net,
        "velocity": velocity,
    }


# --- Theme -----------------------------------------------------------------

LIGHT = {
    "surface": "#fcfcfb",
    "text": "#0b0b0b",
    "secondary": "#52514e",
    "muted": "#898781",
    "grid": "#e1e0d9",
    "axis": "#c3c2b7",
    "Traction": "#2a78d6",
    "Drag": "#eb6834",
    "Rolling resistance": "#1baf7a",
    "Net": "#4a3aa7",
}

DARK_THEME = {
    "surface": "#1a1a19",
    "text": "#ffffff",
    "secondary": "#c3c2b7",
    "muted": "#898781",
    "grid": "#2c2c2a",
    "axis": "#383835",
    "Traction": "#3987e5",
    "Drag": "#d95926",
    "Rolling resistance": "#199e70",
    "Net": "#9085e9",
}

THEME = DARK_THEME if DARK else LIGHT

FORCE_SERIES = ["Traction", "Drag", "Rolling resistance", "Net"]


# --- Plotting --------------------------------------------------------------

def style_axes(ax, ylabel, xlabel=True):
    ax.set_facecolor(THEME["surface"])
    ax.grid(True, color=THEME["grid"], linewidth=0.8, zorder=0)
    ax.set_axisbelow(True)
    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    for side in ("left", "bottom"):
        ax.spines[side].set_color(THEME["axis"])
        ax.spines[side].set_linewidth(1.0)
    ax.tick_params(colors=THEME["muted"], labelsize=9, length=0)
    ax.set_ylabel(ylabel, color=THEME["secondary"], fontsize=10)
    if xlabel:
        ax.set_xlabel("time (s)", color=THEME["secondary"], fontsize=10)


def label_line_ends(ax, run):
    """Direct labels riding the end of each force line: colored dot + ink text.

    Identity never rests on color matching alone, which the aqua series needs
    on the light surface. Labels are staggered so near-equal endpoints (drag
    and rolling resistance settle close together) do not overlap.
    """
    lo, hi = ax.get_ylim()
    min_gap = 0.06 * (hi - lo)

    placed = sorted(((run[name][-1], name) for name in FORCE_SERIES))
    ends = [y for y, _ in placed]

    # push apart from the bottom up, then re-centre the stack on the endpoints
    # it labels — otherwise a run that ends with every force near zero throws
    # all four labels upward into a column floating clear of the lines
    text_ys = []
    for y in ends:
        text_ys.append(y if not text_ys else max(y, text_ys[-1] + min_gap))
    shift = (sum(text_ys) - sum(ends)) / len(ends)
    text_ys = [y - shift for y in text_ys]

    # a label pushed off its line needs a leader back to the point it names,
    # and the leader needs horizontal run to be legible — so when the stack
    # spreads, the whole column moves out and the leaders slant
    displaced = [abs(yt - y) > 0.01 * (hi - lo) for (y, _), yt in zip(placed, text_ys)]
    x_text = run["t"][-1] + (0.05 if any(displaced) else 0.015) * TOTAL_TIME

    for (y, name), y_text, is_displaced in zip(placed, text_ys, displaced):
        leader = None
        if is_displaced:
            leader = dict(arrowstyle="-", color=THEME["muted"],
                          linewidth=0.8, shrinkA=2, shrinkB=3)
        ax.annotate(
            name,
            xy=(run["t"][-1], y),
            xytext=(x_text, y_text),
            va="center",
            ha="left",
            fontsize=9,
            color=THEME["secondary"],
            annotation_clip=False,
            arrowprops=leader,
        )


def plot_forces(ax, run, title):
    ax.axhline(0, color=THEME["axis"], linewidth=1.0, zorder=1)

    for name in FORCE_SERIES:
        ax.plot(
            run["t"],
            run[name],
            color=THEME[name],
            linewidth=2.0,
            linestyle="--" if name == "Net" else "-",
            label=name,
            zorder=3,
        )
        # endpoint dot with a surface ring, so overlapping ends stay readable
        ax.plot(
            run["t"][-1],
            run[name][-1],
            marker="o",
            markersize=6,
            color=THEME[name],
            markeredgecolor=THEME["surface"],
            markeredgewidth=1.5,
            zorder=4,
        )

    style_axes(ax, "force (N)", xlabel=False)
    ax.set_title(title, color=THEME["text"], fontsize=12, loc="left", pad=10)


def plot_velocity(ax, run, title):
    ax.plot(run["t"], run["velocity"], color=THEME["Traction"], linewidth=2.0, zorder=3)
    ax.plot(
        run["t"][-1],
        run["velocity"][-1],
        marker="o",
        markersize=6,
        color=THEME["Traction"],
        markeredgecolor=THEME["surface"],
        markeredgewidth=1.5,
        zorder=4,
    )
    ax.annotate(
        f"{run['velocity'][-1]:.1f}",
        xy=(run["t"][-1], run["velocity"][-1]),
        xytext=(-4, 10),
        textcoords="offset points",
        ha="right",
        fontsize=9,
        color=THEME["secondary"],
    )
    style_axes(ax, "velocity (units/s)")
    ax.set_title(title, color=THEME["text"], fontsize=12, loc="left", pad=10)


def main():
    pyplot.rcParams["font.family"] = "sans-serif"

    runs = [
        ("constant engine force",
         "Constant engine force",
         simulate(constant_engine_force)),
        ("ramped engine force",
         f"Ramped engine force ({RAMP_UP_TIME:g} s up · {HOLD_TIME:g} s hold"
         f" · {RAMP_DOWN_TIME:g} s down)",
         simulate(ramping_engine_force)),
    ]

    fig, axes = pyplot.subplots(2, 2, figsize=(13, 8), sharex=True)
    fig.patch.set_facecolor(THEME["surface"])

    for col, (name, title, run) in enumerate(runs):
        plot_forces(axes[0][col], run, title)
        plot_velocity(axes[1][col], run, "Velocity — " + name)

    # shared y per row so the two throttle programs compare directly
    for row in axes:
        lo = min(ax.get_ylim()[0] for ax in row)
        hi = max(ax.get_ylim()[1] for ax in row)
        for ax in row:
            ax.set_ylim(lo, hi)

    # headroom on the right for the direct labels; ticks still stop at the
    # end of the run so the padding cannot be read as data. The tick step is
    # chosen for the run length rather than fixed, or a long TOTAL_TIME
    # smears hundreds of labels into an unreadable bar.
    ticks = MaxNLocator(nbins=6, steps=[1, 2, 2.5, 5, 10]).tick_values(0, TOTAL_TIME)
    ticks = [t for t in ticks if 0 <= t <= TOTAL_TIME]
    for row in axes:
        for ax in row:
            ax.set_xlim(0, TOTAL_TIME * 1.45)
            ax.set_xticks(ticks)

    for col, (_, _, run) in enumerate(runs):
        label_line_ends(axes[0][col], run)

    handles, labels = axes[0][0].get_legend_handles_labels()
    legend = fig.legend(
        handles,
        labels,
        loc="lower center",
        ncol=4,
        frameon=False,
        fontsize=10,
    )
    for text in legend.get_texts():
        text.set_color(THEME["secondary"])

    fig.suptitle(
        "Racer — forces and velocity over time (forward only)",
        color=THEME["text"],
        fontsize=15,
        x=0.06,
        ha="left",
    )
    fig.tight_layout(rect=(0, 0.05, 1, 0.95))
    fig.savefig("forces.png", dpi=150, facecolor=THEME["surface"])

    # table view: the numbers behind the last frame of each run
    for _, title, run in runs:
        print("\n" + title)
        print(f"  {'t':>5} {'traction':>10} {'drag':>10} {'rolling':>10} {'net':>10} {'v':>8}")
        for i in range(0, len(run["t"]), 10):
            print(
                f"  {run['t'][i]:5.1f} {run['Traction'][i]:10.1f} {run['Drag'][i]:10.1f} "
                f"{run['Rolling resistance'][i]:10.1f} {run['Net'][i]:10.1f} {run['velocity'][i]:8.2f}"
            )

    pyplot.show()


if __name__ == "__main__":
    main()
