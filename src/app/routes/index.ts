import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { PostRoutes } from "../module/post/post.route";
import { CommentRoutes } from "../module/comment/comment.route";
import { PaymentRoutes } from "../module/payment/payment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/posts",
    route: PostRoutes,
  },
  {
    path: "/comments",
    route: CommentRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
