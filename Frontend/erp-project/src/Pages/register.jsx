"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Bot,
  BrainCircuit,
  BarChart3,
  Cpu,
  Trophy,
  ShieldCheck,
  User,
} from "lucide-react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
  signOut,
} from "firebase/auth";

import { toast } from "sonner";

import { auth, googleProvider } from "@/lib/firebase";

/* ASSETS */
import campus from "@/assets/campus.webp";

import robotics from "@/assets/robotics.webp";

import aiAnalytics from "@/assets/image7.webp";

import aiLearning from "@/assets/image8.webp";
import { useLoginHook } from "@/Hook/login.hook";
import { useDispatch } from "react-redux";

const Register = () => {
  const { register, handleSubmit } =
    useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { mutateAsync, isPending } = useLoginHook()
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  /* REGISTER FUNCTION */
  const submitData = async (data) => {
    try {
      dispatch(setLoading());
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      if (!userCredential.user.emailVerified) {
        await signOut(auth);

        toast.warning("Please verify your email ✨");

        return;
      }

      const idToken = await userCredential.user.getIdToken();
      console.log(idToken);

      const res = mutateAsync({ idToken });
      dispatch(
        setUser({
          user: res.user,
          role: res.role,
        }),
      );

      toast.success("Login successful 🚀");
      nav("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* GOOGLE REGISTER */
  const handleGoogleRegister =
    async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider)
        const idToken = await result.user.getIdToken();
        await mutateAsync({ idToken })

        toast.success(
          "Google Registration Success 🎉"
        );

        nav("/");
      } catch (error) {
        toast.error(error.message);
      }
    };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* HERO IMAGE */}
      <div className="absolute inset-0">
        <img
          src={campus}
          alt="campus"
          className="
          w-full
          h-full
          object-cover
          scale-105
        "
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/75" />

        {/* CYAN LIGHT */}
        <div className="absolute top-0 left-0 w-150 h-150 bg-cyan-500/20 blur-[140px] rounded-full" />

        {/* PURPLE LIGHT */}
        <div className="absolute bottom-0 right-0 w-150 h-150 bg-purple-500/20 blur-[140px] rounded-full" />

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />
      </div>

      {/* SCI FI RINGS */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear",
        }}
        className="
        absolute
        top-1/2
        left-1/2
        w-275
        h-275
        rounded-full
        border
        border-cyan-500/10
        -translate-x-1/2
        -translate-y-1/2
      "
      />

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
        className="
        absolute
        top-1/2
        left-1/2
        w-212.5
        h-212.5
        rounded-full
        border
        border-purple-500/10
        -translate-x-1/2
        -translate-y-1/2
      "
      />

      {/* LEFT PANELS */}
      <div className="hidden 2xl:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col gap-6 z-20">

        <FloatingCard
          image={campus}
          icon={<GraduationCap />}
          title="Smart Campus"
          subtitle="Future AI University"
          glow="cyan"
        />

        <FloatingCard
          image={aiLearning}
          icon={<BrainCircuit />}
          title="AI Learning"
          subtitle="Personalized Education"
          glow="purple"
          reverse
        />
      </div>

      {/* RIGHT PANELS */}
      <div className="hidden 2xl:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-6 z-20">

        <FloatingCard
          image={robotics}
          icon={<Bot />}
          title="Robotics Lab"
          subtitle="Future Innovation System"
          glow="cyan"
        />

        <FloatingCard
          image={aiAnalytics}
          icon={<BarChart3 />}
          title="AI Analytics"
          subtitle="Real-time Smart Insights"
          glow="purple"
          reverse
        />
      </div>

      {/* REGISTER CARD */}
      <div className="relative z-40 flex items-center justify-center min-h-screen px-4 py-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          relative
          w-full
          max-w-112.5
        "
        >
          {/* OUTER GLOW */}
          <div className="absolute inset-0 rounded-[40px] bg-linear-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-3xl" />

          {/* CARD */}
          <div
            className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-cyan-500/20
            bg-black/45
            backdrop-blur-3xl
            p-8
            shadow-[0_0_80px_rgba(0,255,255,0.15)]
          "
          >
            {/* TOP LIGHT */}
            <div className="absolute top-0 left-0 h-0.5 w-full bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

            {/* GLOW */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />

            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full" />

            {/* ICON */}
            <div className="text-center relative z-10">
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="
                inline-flex
                items-center
                justify-center
                w-20
                h-20
                rounded-[28px]
                bg-linear-to-br
                from-cyan-500
                to-purple-600
                shadow-[0_0_40px_rgba(34,211,238,0.4)]
              "
              >
                <GraduationCap
                  size={36}
                  className="text-white"
                />
              </motion.div>

              {/* TITLE */}
              <h1
                className="
                mt-6
                text-4xl
                font-black
                text-transparent
                bg-clip-text
                bg-linear-to-r
                from-cyan-300
                via-white
                to-purple-300
              "
              >
                Create Account
              </h1>

              <p className="text-gray-400 mt-3 text-sm">
                Join futuristic AI ERP system
              </p>
            </div>

            {/* FORM */}
            {/* FORM */}
            <form
              onSubmit={handleSubmit(submitData)}
              className="mt-8 space-y-5"
            >

              {/* NAME */}
              <div className="relative group">
                <User
                  size={18}
                  className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-cyan-400
        group-focus-within:text-cyan-300
      "
                />

                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  className="
        w-full
        h-14
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        pl-12
        pr-4
        text-white
        placeholder:text-gray-500
        outline-none
        transition-all
        duration-300
        focus:border-cyan-500
        focus:ring-2
        focus:ring-cyan-500/30
        focus:bg-cyan-500/3
      "
                />
              </div>

              {/* EMAIL */}
              <div className="relative group">
                <Mail
                  size={18}
                  className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-cyan-400
      "
                />

                <input
                  type="email"
                  placeholder="University Email"
                  {...register("email")}
                  className="
        w-full
        h-14
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        pl-12
        pr-4
        text-white
        placeholder:text-gray-500
        outline-none
        transition-all
        duration-300
        focus:border-cyan-500
        focus:ring-2
        focus:ring-cyan-500/30
      "
                />
              </div>

              {/* PHONE NUMBER */}
              <div className="relative group">

                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                  className="
        w-full
        h-14
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        px-4
        text-white
        placeholder:text-gray-500
        outline-none
        transition-all
        duration-300
        focus:border-purple-500
        focus:ring-2
        focus:ring-purple-500/30
      "
                />
              </div>

              {/* GENDER */}
              <div className="relative">

                <select
                  {...register("gender")}
                  className="
        w-full
        h-14
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        px-4
        text-white
        outline-none
        transition-all
        duration-300
        focus:border-cyan-500
        focus:ring-2
        focus:ring-cyan-500/30
      "
                >
                  <option
                    value=""
                    className="bg-black"
                  >
                    Select Gender
                  </option>

                  <option
                    value="male"
                    className="bg-black"
                  >
                    Male
                  </option>

                  <option
                    value="female"
                    className="bg-black"
                  >
                    Female
                  </option>
                </select>
              </div>

              {/* PASSWORD */}
              <div className="relative group">

                <Lock
                  size={18}
                  className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-purple-400
      "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create Password"
                  {...register("password")}
                  className="
        w-full
        h-14
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        pl-12
        pr-12
        text-white
        placeholder:text-gray-500
        outline-none
        transition-all
        duration-300
        focus:border-purple-500
        focus:ring-2
        focus:ring-purple-500/30
      "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-gray-400
      "
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* REGISTER BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                disabled={loading}
                type="submit"
                className="
      relative
      overflow-hidden
      w-full
      h-14
      rounded-2xl
      bg-linear-to-r
      from-cyan-500
      via-blue-500
      to-purple-600
      text-white
      font-bold
      shadow-[0_0_40px_rgba(34,211,238,0.4)]
    "
              >

                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                  className="
        absolute
        inset-0
        bg-linear-to-r
        from-transparent
        via-white/20
        to-transparent
      "
                />

                <span className="relative z-10 flex items-center justify-center gap-2">

                  {loading
                    ? "Creating..."
                    : "Create Account"}

                  <ArrowRight size={18} />

                </span>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* FOOTER */}
      <footer
        className="
        absolute
        bottom-5
        left-1/2
        -translate-x-1/2
        w-[95%]
        rounded-[35px]
        border
        border-white/10
        bg-black/40
        backdrop-blur-3xl
        px-8
        py-5
        z-50
      "
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          <FooterItem
            icon={<GraduationCap />}
            title="25+"
            subtitle="Courses"
          />

          <FooterItem
            icon={<ShieldCheck />}
            title="8,500+"
            subtitle="Students"
          />

          <FooterItem
            icon={<Cpu />}
            title="450+"
            subtitle="Teachers"
          />

          <FooterItem
            icon={<Bot />}
            title="1,200+"
            subtitle="Projects"
          />

          <FooterItem
            icon={<Trophy />}
            title="98%"
            subtitle="Success Rate"
          />
        </div>
      </footer>
    </div>
  );
};

/* FLOATING CARD */
const FloatingCard = ({
  image,
  icon,
  title,
  subtitle,
  glow,
  reverse,
}) => {
  return (
    <motion.div
      animate={{
        y: reverse
          ? [10, -10, 10]
          : [-10, 10, -10],
      }}
      transition={{
        repeat: Infinity,
        duration: 5,
      }}
      className={`
      relative
      ${reverse ? "ml-12" : ""
        }
      w-85
      h-57.5
      rounded-4xl
      overflow-hidden
      border
      ${glow === "cyan"
          ? "border-cyan-500/20"
          : "border-purple-500/20"
        }
      bg-black/40
      backdrop-blur-2xl
    `}
    >
      <img
        src={image}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

      <div className="absolute bottom-5 left-5 flex items-center gap-3">
        <div
          className={`
          w-12
          h-12
          rounded-2xl
          flex
          items-center
          justify-center
          backdrop-blur-xl
          border
          ${glow === "cyan"
              ? "bg-cyan-500/20 border-cyan-400/20 text-cyan-300"
              : "bg-purple-500/20 border-purple-400/20 text-purple-300"
            }
        `}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-white font-bold text-lg">
            {title}
          </h3>

          <p className="text-sm text-gray-300">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* FOOTER ITEM */
const FooterItem = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="flex items-center gap-4"
    >
      <div
        className="
        w-14
        h-14
        rounded-2xl
        bg-linear-to-br
        from-cyan-500/20
        to-purple-500/20
        border
        border-white/10
        flex
        items-center
        justify-center
        text-cyan-300
      "
      >
        {icon}
      </div>

      <div>
        <h2 className="text-2xl font-black">
          {title}
        </h2>

        <p className="text-sm text-gray-400">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export default Register;