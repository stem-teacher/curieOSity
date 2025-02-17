#!/usr/bin/env python3
"""
Reaction Kinetics Simulation
----------------------------
A simple 2D particle simulation demonstrating how temperature affects
the rate of reaction. Collisions exceeding an activation energy
threshold convert 'reactant' particles (blue) to 'product' particles (red).

Dependencies:
  - matplotlib
  - numpy (for convenience in array operations)
"""

import math
import random
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib.widgets import Slider

# ---------------------------
# 1. GLOBAL PARAMETERS
# ---------------------------
WIDTH = 6.0   # Width of the simulation axes (in figure units)
HEIGHT = 4.0  # Height of the simulation axes
NUM_PARTICLES = 50
PARTICLE_RADIUS = 0.05   # In figure coordinate units
MASS = 1.0               # Arbitrary mass units
ACTIVATION_ENERGY = 5.0  # Reaction activation energy (arbitrary units)
BASE_TEMPERATURE = 300.0 # Reference temperature (for scaling velocities)

# For collision detection, we’ll treat the simulation region as [0, WIDTH] x [0, HEIGHT].
# Note: matplotlib figure coordinates differ from typical “pixel” coordinates in a GUI.

# ---------------------------
# 2. PARTICLE DEFINITION
# ---------------------------
class Particle:
    """Represents a single particle with position, velocity, and state."""
    def __init__(self, x, y, vx, vy, state="reactant"):
        self.x = x
        self.y = y
        self.vx = vx
        self.vy = vy
        self.state = state  # 'reactant' or 'product'

    def kinetic_energy(self):
        """Calculate kinetic energy = 0.5 * m * v^2."""
        return 0.5 * MASS * (self.vx ** 2 + self.vy ** 2)

# ---------------------------
# 3. INITIALIZE PARTICLES
# ---------------------------
def init_particles(n=NUM_PARTICLES):
    particles = []
    for _ in range(n):
        x = random.uniform(PARTICLE_RADIUS, WIDTH - PARTICLE_RADIUS)
        y = random.uniform(PARTICLE_RADIUS, HEIGHT - PARTICLE_RADIUS)
        vx = (random.random() - 0.5) * 2.0  # ~ uniform in [-1, 1]
        vy = (random.random() - 0.5) * 2.0
        particles.append(Particle(x, y, vx, vy, "reactant"))
    return particles

particles = init_particles()
reaction_count = 0

# ---------------------------
# 4. MATPLOTLIB SETUP
# ---------------------------
fig = plt.figure(figsize=(10, 5))
fig.suptitle("Reaction Kinetics Simulation", fontsize=14)

# Create 2 subplots:
# Left: simulation
# Right: (optional) energy profile or simple placeholder
ax_sim = fig.add_subplot(1, 2, 1)
ax_profile = fig.add_subplot(1, 2, 2)

# Adjust subplots so we have space for the slider at the bottom
plt.subplots_adjust(left=0.08, right=0.98, bottom=0.25, top=0.88, wspace=0.3)

# Set up the simulation axis
ax_sim.set_xlim(0, WIDTH)
ax_sim.set_ylim(0, HEIGHT)
ax_sim.set_aspect('equal', 'box')
ax_sim.set_title("Particle Simulation")

# We'll plot reactants and products separately, updating them each frame
reactant_scatter = ax_sim.scatter([], [], c='blue', label='Reactants')
product_scatter = ax_sim.scatter([], [], c='red', label='Products')
reaction_text = ax_sim.text(0.02, 0.96, f"Reactions: {reaction_count}",
                            transform=ax_sim.transAxes,
                            fontsize=12, verticalalignment='top')

# Set up the energy profile axis (static)
ax_profile.set_title("Energy Profile")
ax_profile.set_xlim(0, 1)   # We’ll just draw a simple shape from x=0 to x=1
ax_profile.set_ylim(-1.5, ACTIVATION_ENERGY + 1)
ax_profile.set_xticks([])
ax_profile.set_yticks([])

# Draw a simplistic energy diagram
def draw_energy_profile():
    # Reactant energy = 0
    # Activation peak = ACTIVATION_ENERGY
    # Product energy = -1 (below reactants)
    reactE = 0
    peakE = ACTIVATION_ENERGY
    productE = -1

    # We'll just plot a line that goes from x=0 to x=0.5 to x=1
    # with y-values reactE -> peakE -> productE
    x_vals = [0, 0.5, 1]
    y_vals = [reactE, peakE, productE]
    ax_profile.plot(x_vals, y_vals, color='black')
    # Dashed line for activation energy
    ax_profile.axhline(y=peakE, color='red', linestyle='--')
    # Add some labels
    ax_profile.text(0, reactE + 0.2, "Reactants", fontsize=10)
    ax_profile.text(0.52, peakE, "$E_a$", fontsize=10, color='red')
    ax_profile.text(0.8, productE - 0.2, "Products", fontsize=10)

draw_energy_profile()

# ---------------------------
# 5. SLIDER FOR TEMPERATURE
# ---------------------------
ax_slider = plt.axes([0.15, 0.1, 0.7, 0.03])  # x, y, width, height (in figure coords)
slider_temp = Slider(
    ax=ax_slider,
    label='Temperature (K)',
    valmin=200,
    valmax=600,
    valinit=BASE_TEMPERATURE,
    valstep=10
)

def update_temperature(val):
    """Callback for slider interaction."""
    # Just read the slider value. Our animation function will use it.
    pass

slider_temp.on_changed(update_temperature)

# ---------------------------
# 6. ANIMATION FUNCTION
# ---------------------------
def animate(frame):
    """Called repeatedly by FuncAnimation to update the simulation."""
    global reaction_count

    # Current temperature from slider
    T = slider_temp.val

    # Velocity scale factor: sqrt(T / 300)
    scale = math.sqrt(T / BASE_TEMPERATURE)

    # Update particle positions
    for p in particles:
        p.x += p.vx * scale * 0.02  # The 0.02 is a "time-step" factor
        p.y += p.vy * scale * 0.02

        # Bounce off walls
        if p.x < PARTICLE_RADIUS:
            p.x = PARTICLE_RADIUS
            p.vx *= -1
        if p.x > WIDTH - PARTICLE_RADIUS:
            p.x = WIDTH - PARTICLE_RADIUS
            p.vx *= -1
        if p.y < PARTICLE_RADIUS:
            p.y = PARTICLE_RADIUS
            p.vy *= -1
        if p.y > HEIGHT - PARTICLE_RADIUS:
            p.y = HEIGHT - PARTICLE_RADIUS
            p.vy *= -1

    # Check collisions
    for i in range(len(particles)):
        for j in range(i+1, len(particles)):
            pa = particles[i]
            pb = particles[j]
            dx = pa.x - pb.x
            dy = pa.y - pb.y
            dist = math.sqrt(dx*dx + dy*dy)
            if dist < 2 * PARTICLE_RADIUS:
                # Combined kinetic energy
                if pa.state == "reactant" or pb.state == "reactant":
                    ke_sum = pa.kinetic_energy() + pb.kinetic_energy()
                    if ke_sum > ACTIVATION_ENERGY:
                        # Reaction
                        if pa.state == "reactant":
                            pa.state = "product"
                        if pb.state == "reactant":
                            pb.state = "product"
                        reaction_count += 1

    # Separate arrays for reactant and product coordinates
    rx = [p.x for p in particles if p.state == "reactant"]
    ry = [p.y for p in particles if p.state == "reactant"]
    px = [p.x for p in particles if p.state == "product"]
    py = [p.y for p in particles if p.state == "product"]

    reactant_scatter.set_offsets(np.column_stack((rx, ry)) if rx else [])
    product_scatter.set_offsets(np.column_stack((px, py)) if px else [])

    # Update reaction count text
    reaction_text.set_text(f"Reactions: {reaction_count}")

    return (reactant_scatter, product_scatter, reaction_text)

# ---------------------------
# 7. RUN ANIMATION
# ---------------------------
anim = animation.FuncAnimation(
    fig, animate, frames=200, interval=50, blit=False
)

plt.show()
